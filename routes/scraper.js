var express = require('express');
var router = express.Router();

var Models = require('../models');
var Xray = require('x-ray');
var x = Xray();
var moment = require('moment');

/* Simple find */
router.get('/', function(req, res, next) {
	x('http://comicfury.com/index.php?page=1', {
		image: ['.fpcomicavatar img@src'],
		comic_title: ['.fpcomicdescription > a'],
		url: ['.fpcomicdescription > a@href'],
		archive_url: ['.comicactions > a:nth-child(2)@href'], // make sure to grab odd numbers (1, 3)
		profile_url: ['.comicactions > a:nth-child(1)@href'],
		current_chapter: ['.fpcomicstat:nth-child(1)@html'] // not used directly
	})(function(err, obj) {
		console.log(err);
		console.log("object");
		console.log(obj.current_chapter[0]);
		var list = [];
		res.json(obj);
		for (var i = 0; i < obj.profile_url.length; i++) {
			var chapter = obj.current_chapter[i].replace("</b>", "").replace("<b>", "").replace("Comics: ", "");
			var comic = new Models.Comic({
				url: obj.url[i],
				comic_title: obj.comic_title[i],
				archive_url: obj.archive_url[i],
				profile_url: obj.profile_url[i],
				current_chapter: chapter,
				image: obj.image[i]
			})
			
			console.log(comic);
			//randomA(i, obj.profile_url[i], obj.comic_title[i], comic._id);
		}
	});
});

function randomA(index, data, title, id) {
	console.log("randomA called");
	console.log(index);
	console.log(data);

	x('http://comicfury.com/comicprofile.php?url=bentelbows', {
		genre: ".authorinfo:nth-of-type(3) > span.info",
		language: ".authorinfo:nth-of-type(2) > span.info:nth-child(2)",
		author: ".authorname@html",
		description: ".pccontent@html", // need to clean \n and \t
		first_page: ".authorinfo:nth-of-type(7) > a@href"
	})(function(err, obj) {
		console.log(obj);
		var list = [];
		var description = obj.description.replace("/t", "").replace("/n", "");
		res.json(obj);
		for (var i = 0; i < obj.profile_url.length; i++) {
			var profile = new Models.ComicProfile({
				comic_id: id,
				comic_title: title,
				genre: obj.genre,
				language: obj.language,
				author: obj.author,
				description: obj.description,
				first_page: obj.first_page
			});
			profile.save(function() {

			});
		}
	});
}

router.get('/archive', function(req, res, next) {
	var date = moment().format("MM/DD/YYYY");
	x('http://inontheout.thecomicseries.com/archive/', {
		chapter_name: ['a'],
		chapter_url: ['a@href']
	})(function(err, obj) {
		console.log("start");
		console.log(obj);
		for (var i = 0; i < obj.chapter_name.length; i++) {
			console.log("loop");
			var chapter_url = obj.chapter_url[i];
			var chapter_name = obj.chapter_name[i];
			var chapter_arr = obj.chapter_url[i].split('/');
			console.log(chapter_url);
			if (typeof chapter_arr !== 'undefined' && chapter_arr.length > 1 && 
				!isNaN(parseInt(chapter_arr[chapter_arr.length - 2]))) {
				var chapter_number = parseInt(chapter_arr[chapter_arr.length - 2]);
				console.log(chapter_number);
				var chapter = new Models.Chapter({
					comic_title: "http://thebloomsaga.thecomicseries.com/archive/",
					chapter_title: chapter_name,
					chapter: chapter_number,
					chapter_url: chapter_url
				});
				chapter.save(function(err, comic) {
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
