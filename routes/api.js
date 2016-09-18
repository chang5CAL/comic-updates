var express = require('express');
var router = express.Router();

var Models = require('../models');

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
