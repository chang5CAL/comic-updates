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
	Models.Comic.find({comic_title_url: req.params.comicTitleUrl}).exec(function(err, result) {
		if (err || result.length == 0) {
			res.json({});
		} else {
			res.json(result[0]);
		}
		// Problem how to obtain the individual pages to the chapter?
	})
});

/*router.get('/chapters/pageNumber', function(req, res, next) {
	if (pages == null || pages.length == 0) {
		console.log("empty page number");
		res.json({ numPage: 0});
	} else {
		console.log("send page number");
		var numPages = (pages.length / CHAPTERS_PER_PAGE)
		res.json( {numPage: numPages} );
	}
});
*/
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
	if (pages == null || pages.length == 0) { 
		console.log("empty pages right now");
		Models.Page.find().sort({$natural: -1}).exec(function(err, newPages) {
			if (err) return handleError(err);
			console.log("got something from mongo call");
			var numPages = Math.ceil((newPages.length / CHAPTERS_PER_PAGE));
			obj = {
				list: sliceArray(newPages, CHAPTERS_PER_PAGE, page),
				numPages: numPages
			}
			res.json(obj);
		});
	} else {
		var numPages = Math.ceil((pages.length / CHAPTERS_PER_PAGE))
		console.log("already existing list");
		obj = {
			list: sliceArray(pages, CHAPTERS_PER_PAGE, page),
			numPages: numPages
		}
		res.json(obj);
	}
});

/*
	Endpoint that returns all pages relevent to a comic
*/
router.get('/chapters/:comic/:page', function(req, res, next) {
	Models.Page.find({"comic_title_url": req.params.comic}).sort({"page": -1}).exec(function(err, newPage) {
		var page = req.params.page;
		if (err) return handleError(err);
		var numPages = Math.ceil(newPage.length / COMIC_PER_PAGE);
		obj = {
			list: sliceArray(newPage, COMIC_PER_PAGE, page),
			numPages: numPages
		}
		res.json(obj);
	});
});

/*
	Endpoint that returns comics within a certain genre sorted in alphabetical order. Caches the list for future
	uses. Must be re-cached when the user decides to re-scrape
*/
router.get('/genre/:genre/:page', function(req, res, next) {
	var genre = req.params.genre; 
	var page = req.params.page;
	if (page == 0) {
		res.json([]);
	}
	if (typeof genres[genre] === 'undefined') {
		Models.Comic.find({genre: req.params.genre}).sort("comic_title").exec(function(err, newGenre) {
			genres[genre] = newGenre	
			var numPages = Math.ceil(genres[genre].length / COMIC_PER_PAGE);
			obj = {
				list: sliceArray(genres[genre], COMIC_PER_PAGE, page),
				numPages: numPages
			}
			res.json(obj);
		});
	} else {
		var numPages = Math.ceil(genres[genre].length / COMIC_PER_PAGE);
		obj = {
			list: sliceArray(genres[genre], COMIC_PER_PAGE, page),
			numPages: numPages
		}
		res.json(obj);
	}
});

router.get('/genres', function(req, res, next) {
	Models.Genre.distinct("genre").exec(function(err, genreList) {
		res.json(genreList);
	});
});

router.get('/reset', function(req, res, next) {
	pages = [];
	genres = {};
	res.json("success");
});

module.exports = router;