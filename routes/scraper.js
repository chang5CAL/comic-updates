var express = require('express');
var router = express.Router();

var Models = require('../models');
var Xray = require('x-ray');
var x = Xray();
var moment = require('moment');

/* Simple find */
router.get('/', function(req, res, next) {
	findComics(1);
	res.json("Success")
});

router.get('/findNew', function(req, res, next) {
	findComics(50);
	res.json("Success")
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
				//console.log(obj);
				console.log("started comics");
				for (var j = 0; j < obj.profile_url.length; j++) {
					addComic(obj, j);
				}
				console.log("finished comics");
			}
		});
	}
}

function addComic(obj, i) {
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
			addProfile(obj.profile_url[i], obj.comic_title[i], com._id);
			addChapters(obj.archive_url[i], obj.comic_title[i], com._id);
		}
	});
}

function addProfile(data, title, id) {
	console.log("add Profile called");

	x(data, {
		genre: ".authorinfo:nth-of-type(3) > span.info",
		language: ".authorinfo:nth-of-type(2) > span.info:nth-child(2)",
		author: ".authorname@html",
		description: ".pccontent@html", // need to clean \n and \t
		first_page: ".authorinfo:nth-of-type(7) > a@href"
	})(function(err, obj) {
		if (!err) {
			//console.log(obj);
			var description = obj.description.replace("/t", "").replace("/n", "");
			var profile = new Models.Profile({
				comic_id: id,
				comic_title: title,
				genre: obj.genre,
				language: obj.language,
				author: obj.author,
				description: obj.description,
				first_page: obj.first_page
			});
			//console.log(profile);
			profile.save(function(err, profileObj) {
				console.log("profile save");
				console.log(err);
			});
		}
	});
}

function addChapters(archive_url, title, id) {
	console.log("add chapters called");
	var date = moment().format("MM/DD/YYYY");
	x(archive_url, {
		page_name: ['a'],
		page_url: ['a@href']
	})(function(err, obj) {
		//console.log("start");
		//console.log("add chapter to " + title + " got " + err);
		for (var i = 0; i < obj.page_name.length; i++) {
			//console.log("loop");
			var page_url = obj.page_url[i];
			var page_name = obj.page_name[i];
			var page_arr = obj.page_url[i].split('/');
			//console.log(page_url);
			if (typeof page_arr !== 'undefined' && page_arr.length > 1 && 
				!isNaN(parseInt(page_arr[page_arr.length - 2]))) {
				var page_number = parseInt(page_arr[page_arr.length - 2]); // does if check first to prevent possible error
				//console.log(page_number);
				var page = new Models.Page({
					comic_id: id,
					comic_title: title,
					page_title: page_name,
					page: page_number,
					page_url: page_url,
					date_added: date
				});
				//console.log(page);
				page.save(function(err, pageObj) {
					console.log("page save");
					console.log(err);
				});
			}
		}
	});
}

router.get('/archive', function(req, res, next) {
	var date = moment().format("MM/DD/YYYY");
	x('http://spaceronind.thecomicseries.com/archive/', {
		page_name: ['a'],
		page_url: ['a@href']
	})(function(err, obj) {
		console.log("start");
		console.log(obj);
		for (var i = 0; i < obj.page_name.length; i++) {
			console.log("loop");
			var page_url = obj.page_url[i];
			var page_name = obj.page_name[i];
			var page_arr = obj.page_url[i].split('/');
			console.log(page_url);
			if (typeof page_arr !== 'undefined' && page_arr.length > 1 && 
				!isNaN(parseInt(page_arr[page_arr.length - 2]))) {
				var page_number = parseInt(page_arr[page_arr.length - 2]);
				console.log(page_number);
				var page = new Models.Page({
					comic_title: "http://spaceronind.thecomicseries.com/archive/",
					page_title: page_name,
					page: page_number,
					page_url: page_url,
					date_added: date
				});
				page.save(function(err, comic) {
					console.log(err);
				});
			}
		}
		console.log(obj);
		//var list = [];
		res.json(obj);
	});
});

module.exports = router;
