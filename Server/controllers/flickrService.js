var express = require('express');
var router = express.Router();
var flickrRestService = require("../flickrRestService").flickrRestService;
var service = new flickrRestService();

var mongoose = require('mongoose');
var Image = require('../models/image.js');
router.get('/publicFeed', function(req, res) {
	Image.find({}, function(err, images) {
		if (err){
			res.json({error: "images not found"});
			throw err;

		} 
		// object of all the users
  		res.json(images);
	});
});

router.get('/searchByTag', function(req, res) {

	service.searchByQuery(req.query.tags).then(function(result){
       res.json(result);
	});   
});

module.exports = router;