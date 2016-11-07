var express = require('express');
var router = express.Router();

var Models = require('../models');
var Xray = require('x-ray');
var x = Xray();
var moment = require('moment');

var FeedParser = require('feedparser');
var request = require('request');

// Scans through all pages to grab all existing URL's
router.get('/', function(req, res, next) {
	findComics(1); // 1050
	res.json("Success")
});

// Scans the first 50 page to try and find new series
router.get('/findNew', function(req, res, next) {
	findComics(50);
	res.json("Success");
});

function findComics(max) {
	for (var i = 1; i <= max; i++) {
		x('http://comicfury.com/index.php?page=' + i, {
			image: ['.fpcomicavatar img@src'],
			comic_title: ['.fpcomicdescription > a'],
			url: ['.fpcomicdescription > a@href'],
			archive_url: ['.comicactions > a:nth-child(2)@href'], // make sure to grab odd numbers (1, 3)
			profile_url: ['.comicactions > a:nth-child(1)@href'],
			current_chapter: ['.fpcomicstat:nth-child(1)@html'] // not used directly
		})(function(err, obj) {
			if (!err) {
				for (var j = 0; j < obj.profile_url.length; j++) {
					//addComic(obj, j);
					console.log(obj);
					addProfileAndGenre(obj, j);
				}
			}
		});
	}
}

/*function addComic(obj, i) {
	var chapter = obj.current_chapter[i].replace("</b>", "").replace("<b>", "").replace("Comics: ", "");
	var comic = new Models.Comic({
		url: obj.url[i],
		comic_title: obj.comic_title[i],
		archive_url: obj.archive_url[i],
		profile_url: obj.profile_url[i],
		current_chapter: chapter,
		image: obj.image[i]
	});

	comic.save(function(err, com) {
		console.log("save comic: " +err);
		if (!err) {
			addProfileAndGenre(obj.profile_url[i], obj.comic_title[i], com._id);
			addChapters(obj.archive_url[i], obj.comic_title[i], com._id);
		}
	});
}*/

function addProfileAndGenre(object, i) {
	console.log("add Profile called");
	var chapter = object.current_chapter[i].replace("</b>", "").replace("<b>", "").replace("Comics: ", "");
	x(object.profile_url[i], {
		genre: ".authorinfo:nth-of-type(3) > span.info", // @TODO 
		language: ".authorinfo:nth-of-type(2) > span.info:nth-child(2)",
		author: ".authorname@html",
		description: ".pccontent@html", // need to clean \n and \t
		first_page: ".authorinfo:nth-of-type(7) > a@href"
	})(function(err, obj) {
		//console.log("error");
		//console.log(err);
		//console.log(obj);
		if (!err) {
			var description = obj.description.replace("/t", "").replace("/n", "");
			console.log(object);
			var comic_title_url = object.comic_title[i].replace(" ", "-").replace("'", "");
			var comic = new Models.Comic({
				//comic_id: id,
				comic_title: object.comic_title[i],
				genre: obj.genre,
				language: obj.language,
				author: obj.author,
				description: obj.description,
				first_page: obj.first_page,

				comic_title_url: comic_title_url,
				url: object.url[i],
				comic_title: object.comic_title[i],
				archive_url: object.archive_url[i],
				profile_url: object.profile_url[i],
				current_chapter: chapter,
				image: object.image[i]
			});
			comic.save(function(err, profileObj) {

				if (!err) {
					console.log("No Error");
					var genre = new Models.Genre({
						genre: obj.genre,
						comic_id: profileObj._id
					});
					console.log("profile save");
					genre.save(function(err, genreObj) {
						console.log("genre save");
						console.log(err);
					});
					console.log("Adding chapter");
					addChapters(object.archive_url[i], object.comic_title[i], profileObj.comic_title_url, profileObj._id);
					console.log("Chapter added");
				}
			});
		}
	});
}

/* 
TODO: Must update the 3 of pages that the user has available to use
*/
function addChapters(archive_url, title, title_url id) {
	console.log("add chapters called");
	var date = moment().format("MM/DD/YYYY");
	x(archive_url, {
		page_name: ['a'],
		page_url: ['a@href']
	})(function(err, obj) {
		for (var i = 0; i < obj.page_name.length; i++) {
			var page_url = obj.page_url[i];
			var page_name = obj.page_name[i];
			var page_arr = obj.page_url[i].split('/');
			if (typeof page_arr !== 'undefined' && page_arr.length > 1 && 
				!isNaN(parseInt(page_arr[page_arr.length - 2]))) {
				var page_number = parseInt(page_arr[page_arr.length - 2]); // does if check first to prevent possible error
				var page = new Models.Page({
					comic_id: id,
					comic_title: title,
					comic_title_url: title_url,
					page_title: page_name,
					page: page_number,
					page_url: page_url,
					date_added: date
				});
				page.save(function(err, pageObj) {
					console.log("page save");
					console.log(err);
				});
			}
		}
	});
}

// endpoint that will check all comics and see if there has been an update
// in the rss which will cause a re-scrapping of the site archive
router.get('/rss', function(req, res, next) {
    var query = Models.Comic.find(function(err, comics) {
    	if (err) return handleError(err);
    	for (var i = 0; i < comics.length; i++) {
    		url = comics[i].url + 'rss/';
    		checkRss(url, comics[i].last_checked, comics[i]);
    	}
    });	
});

// Reads the rss of the provided URL and if it has been updated
// the site will be re-crawled and the latest date updated
function checkRss(rss, lastCheck, comic) {
	var req = request(rss);
	var feedparser = new FeedParser();
	req.on('response', function (res) {
		var stream = this;
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		stream.pipe(feedparser);
	});

	feedparser.on('readable', function() {
		var stream = this
	    	, meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
	    	, item
	    	, first = false;

		item = stream.read()
		var date = new Date(item.pubdate);
		if (lastCheck < date) {
			// update the current list of comics
			Models.Comic.findById(comic._id, function(err, newComic) {
				if (err) return handleError(err);
				newComic.last_checked = new Date();
				newComic.save(function(err, updatedComic) {
					if (err) return handleError(err);
				});
			});
			// goes through archive and add everythign in again
			// TODO find better way, big bottle neck in runtime
			var title_url = comic.comic_title.replace(" ", "-").replace("'", "");
			addChapters(comic.archive_url, comic.comic_title, title_url, comic._id); 
		}
	});
}


module.exports = router;
