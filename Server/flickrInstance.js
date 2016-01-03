var Constants = require('./Constant/Constants').Constants;
var Q = require('q');
var Flickr = require("flickrapi");

function flickrInstance() {
	var self = this;
	self.instance = {};
	self.flickrOptions = {
		api_key: Constants.flickrOptions.apiKey,
		secret: Constants.flickrOptions.secretKey
	};
}

flickrInstance.prototype.getInstance = function () {
	var self = this;
	var deferred = Q.defer();
	Flickr.tokenOnly(self.flickrOptions, function (error, flickr) {
		if (error) {
			console.log("unable to login flickar!!");
			deferred.reject(null);
		} else if (flickr) {
			console.log("flickr instance is up now u can start use this guy");
			deferred.resolve(flickr);
		}
	});
	return deferred.promise;
};

exports.flickrInstance = flickrInstance;