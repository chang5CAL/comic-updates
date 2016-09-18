var express = require('express');
var router = express.Router();

var Models = require('../models');

/* Simple find */
router.get('/add/:name', function(req, res, next) {
	console.log(req.params.name);
	var comicSite = new Models.ComicSite({url: req.params.name, title: "asdasd"});
	comicSite.save(function(err, site) {
		if (err) return console.error(err);
  		res.json(site);
	});
});

router.get('/findAll', function(req, res, next) {
	Models.ComicSite.find(function(err, sites) {
		if (err) return handleError(err);		
		res.json(sites);
	});
});

module.exports = router;
