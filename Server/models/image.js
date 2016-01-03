var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({

	id: Number,
	owner: String,
	secret: String,
	server: String,
	farm: Number,
	title: String,
	ispublic: Number,
	isfriend: Number,
	isfamily: Number,
	imgUrl : String
});

module.exports = mongoose.model('Image', imageSchema);