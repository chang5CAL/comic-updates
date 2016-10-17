var express = require('express');
var router = express.Router();

var Models = require('../models');

var pages = [];
var genres = {};

var COMIC_PER_PAGE = 25;
var CHAPTERS_PER_PAGE = 100;


function sliceArray(list, numberPerPage, page) {
	return list.slice(numberPerPage * (page - 1), numberPerPage * page);
}

/*
	Endpoint that returns the the information of the comic series that's tied
	to the given comic title url 
*/
router.get('/comic/:comicTitleUrl', function(req, res, next) {
	Models.Comic.find({comic_title_url: req.params.comicTitleUrl}).execute(function(err, result) {
		if (err) {
			res.json({});
		} else {
			res.json(result);
		}
		// Problem how to obtain the individual pages to the chapter?
	})
});

/*
	Endpoint that returns the latest pages added to the list. Caches the list for future
	uses. Must be re-cached when the user decides to re-scrape
*/
router.get('/chapters/:page', function(req, res, next) {
	var page = req.params.page;
	console.log("got an http request " + page);
	if (page == 0) {
		console.log("sending empty");
		res.json([]);
	}
	if (pages.length == 0) { 
		console.log("empty pages right now");
		Models.Page.find().sort({$natural: -1}).exec(function(err, newChapters) {
			if (err) return handleError(err);
			console.log("got something from mongo call");
			pages = newChapters;
			res.json(sliceArray(pages, CHAPTERS_PER_PAGE, page));
		});
	} else {
		console.log("already existing list");
		res.json(sliceArray(pages, CHAPTERS_PER_PAGE, page));
	}
});

router.get('/chapters/:comic/:page', function(req, res, next) {
	Models.Pages.find({"comic_title": req.params.comic}).sort("page").exec(function(err, newPage) {
		var page = req.params.page;
		if (err) return handleError(err);
		res.json(sliceArray(newPage, COMIC_PER_PAGE, page));
	});
});

/*
	Endpoint that returns comics within a certain genre sorted in alphabetical order. Caches the list for future
	uses. Must be re-cached when the user decides to re-scrape
*/
router.get('/genre/:genre/:page' ,function(req, res, next) {
	var genre = req.params.genre; 
	var page = req.params.page;
	if (page == 0) {
		res.json([]);
	}
	if (typeof genres[genre] === 'undefined') {
		Models.Comic.find({genre: req.params.genre}).sort("comic_title").exec(function(err, newGenre) {
			genres[genre] = newGenre	
			res.json(sliceArray(genres[genre], COMIC_PER_PAGE, page));
		});
	} else {
		res.json(sliceArray(genres[genre], COMIC_PER_PAGE, page));
	}
});


module.exports = router;
