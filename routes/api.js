var express = require('express');
var router = express.Router();

var Models = require('../models');

var pages = [];
var genres = {};

var COMIC_PER_PAGE = 25;
var CHAPTERS_PER_PAGE = 100;

/* Simple find */
router.get('/find/:name', function(req, res, next) {
	// params: obtain route information such as above :name
	// query: contains parameter from URL /find?name=example
	var query = Models.Kitten.findOne({'name': req.params.name});
	query.exec(function(err, kitten) {
		if (err) return handleError(err);
		res.json(kitten);
	});
});

function sliceArray(list, numberPerPage, page) {
	return list.slice(numberPerPage * (page - 1), numberPerPage * page);
}

/**/
router.get('/chapters/:page', function(req, res, next) {
	var page = req.params.page;
	if (pages.length == 0) {
		Models.Page.find().sort({$natural: -1}).exec(function(err, newChapters) {
			if (err) return handleError(err);
			pages = newChapters;
			res.json(sliceArray(pages, CHAPTERS_PER_PAGE, page));
		});
	} else {
		res.json(sliceArray(pages, CHAPTERS_PER_PAGE, page));
	}
});

router.get('/genre/:genre/:page' ,function(req, res, next) {
	var genre = req.params.genre; 
	var page = req.params.page;
	if (typeof genres[genre] === 'undefined') {
		Models.Genre.find({genre: req.params.genre}).sort("comic_title").exec(function(err, newGenre) {
			genres[genre] = newGenre	
			res.json(sliceArray(genres[genre], COMIC_PER_PAGE, page));
		});
	} else {
		res.json(sliceArray(genres[genre], COMIC_PER_PAGE, page));
	}
});

router.get("/show", function(req, res, next) {
	res.json(list);
});

router.get('/findAll', function(req, res, next) {
	Models.Kitten.find(function(err, kittens) {
		if (err) return handleError(err);		
		res.json(kittens);
	});
});

/* Simple POST */
router.post('/create', function(req, res, next) {
	// req.body.<parameter-name> for post requests
	var cat = new Models.Kitten({name: req.body.name});
	cat.save(function(err, kitty) {
		if (err) return console.error(err);
  		res.json(kitty);
	});
});

/* Simple POST */
router.post('/create/:name', function(req, res, next) {
	// req.body.<parameter-name> for post requests
	var cat = new Models.Kitten({name: req.params.name});
	cat.save(function(err, kitty) {
		if (err) return console.error(err);
  		res.json(kitty);
	});
});

router.put('/update/:id/:name', function(req, res, next) {
	// 1 line solution
	// Models.Kittten.update({ _id: req.params.id }, { $set: { name: req.params.name }}, callback);
	Models.Kitten.findById(req.params.id, function(err, kitten) {
		if (err) return handleError(err);
		updateKitten.name = req.params.name;
		updateKitten.save(function(err, updateKitten) {
			if (err) return handleError(err);
			res.send(updateKitten);
		});
	});
});

router.delete('delete/:id', function(req, res, next) {
	// Model.Kitten.findOneAndRemove({_id:id})
	//  .then(doc =>)
	Models.Kitten.findOne({_id: req.params.id}, function (err, kitten){
		if (err) return handleError(err);
        kitten.remove();
    });
});

module.exports = router;
