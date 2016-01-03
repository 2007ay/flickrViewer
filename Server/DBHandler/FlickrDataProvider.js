/*
CRUD operation on the flickr feeds;
*/

var dbProviderModule = require("./DBServiceProvider").DBServiceProvider.getInstance();

function FlickrDataProvider(host, port) {
	this.db = dbProviderModule.db;
};

//publicFeeds is one jsonshcema from where we are triving and save
FlickrDataProvider.prototype.getCollection = function (callback) {
	this.db.collection('publicFeeds', function (error, list) {

		if (error) callback(error);
		else callback(null, list);
	});
};

//find all feed and return back
FlickrDataProvider.prototype.findAll = function (callback) {
	this.getCollection(function (error, feedList) {
		if (error) callback(error)
		else {
			feedList.find().toArray(function (error, feedList) {
				if (error) callback(error)
				else callback(null, feedList)
			});
		}
	});
};

//save new feeds
FlickrDataProvider.prototype.save = function (publicFeeds, callback) {
	this.getCollection(function (error, feedList) {
		if (error) callback(false, error)
		else {
			if (typeof (publicFeeds.length) == "undefined") {
				publicFeeds = [publicFeeds];
			}
			debugger;
			feedList.insert(publicFeeds, function () {
				callback(true, publicFeeds);
			});
		}
	});
};

exports.FlickrDataProvider = FlickrDataProvider;