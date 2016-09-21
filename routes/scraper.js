var express = require('express');
var router = express.Router();

var Models = require('../models');
var Xray = require('x-ray');
var x = Xray();
/*var Request = require('request');
var Cheerio = require('cheerio');*/

/* Simple find */
router.get('/', function(req, res, next) {
/*	Request({
		uri: "http://comicfury.com/index.php?page=1"
	}, function(error, response, body) {
		var $ = Cheerio.load(body);
		$('.updateboxinner').each(function(i, elem) {
			console.log(i);
			console.log(elem);
			res.json(elem);
		});
	});
	console.log("started");*/
/*	x('http://comicfury.com/index.php?page=1', {
		avatar: '.fpcomicavatar',
	}, function(err, obj) {
		console.log(err);
		console.log(obj);
		res.json(obj);
	})*/
/*	x('http://comicfury.com/index.php?page=1', {
		image: ['.fpcomicavatar img@src'],
		title: ['.fpcomicdescription > a'],
		url: ['.fpcomicdescription > a@href'],
		archive: ['.comicactions > a:nth-child(2)@href'], // make sure to grab odd numbers (1, 3)
		profile: x(['.comicactions > a:nth-child(1)@href'], {
			title: "title",
			random: ".pccontent"
		}),

	})(function(err, obj) {
		console.log(err);
		console.log("object");
		console.log(obj);
		var list = [];
		res.json(obj);
		for (var i = 0; i < obj.image.length; i++) {
			var newObj = {};
			for (var key in obj) {
				newObj[key] = obj[key][i];
			}
			list.push(newObj);
		}
		console.log("made new list");
		for (var i = 0; i < list.length; i++) {
			console.log("loop at " + i);
			//console.log(list[i]);
			x(list[i].profile, {
				my: 'title',
			})(function(err, obj2) {
				//console.log(list);
				console.log("in the call");
				console.log(obj2);
				res.json(obj2);
			});
		}
		//console.log(list);
	});*/
	x('http://stackoverflow.com/', {
		title: x(['a@href'], 'title'),
	}) (function(err, obj) {
		console.log(err);
		console.log(obj);
	});
/*
	x('http://stackoverflow.com/', {
		title: x('a@href', 'title'),
	}) (function(err, obj) {
		console.log(obj);
	});*/
});

module.exports = router;
