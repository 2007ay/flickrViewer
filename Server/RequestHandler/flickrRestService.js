var Constants = require('../Constant/Constants').Constants;
var InstanceProvider = require("./flickrInstance").flickrInstance;
var dataProvider = require("../DBHandler/FlickrDataProvider").FlickrDataProvider;
var Q = require('q');
var instance = new InstanceProvider();
var flickrDataProvider = new dataProvider();

function flickrRestService() {
	'use strict';

	var self = this;
	self.flickrInstance = null; // this is the flickar instacnce for futrue uses
	instance.getInstance().then(function (instance) {
		if (instance) {
			self.flickrInstance = instance;
			self.flickrInstance.people.getPublicPhotos({
				api_key: Constants.flickrOptions.apiKey,
				secret: Constants.flickrOptions.secretKey,
				user_id: Constants.flickrOptions.defaultNSID,
				page: 1,
				per_page: 100,
				progress: false
			}, function (err, result) {
				if (err) {
					console.log("unable to flickar get the result!!" + JSON.stringify(err));
				} else if (result && result.photos) {
					var downloadPhotos = [];
					result.photos.photo.forEach(function (val) {
						val.url = 'https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '.jpg';
						downloadPhotos.push(val);
					});
					self.savePublicFeed(downloadPhotos);
				}
			});
		}
	});
}

//if you know the user name and wanted to get the snid .. then use this functionlity
flickrRestService.prototype.searchByQuery = function (request, callback) {
	'use strict';

	var deferred = Q.defer();

	self.flickrInstance.photo.searchByQuery({
		api_key: Constants.flickrOptions.apiKey,
		secret: Constants.flickrOptions.secretKey,
		username: Constants.flickrOptions.defaultUserId,
		progress: false
	}, function (err, result) {
		if (err) {
			deferred.reject(callback(true, result));
			console.log("unable to flickar get the result!!" + JSON.stringify(err));
		} else if (result) {
			deferred.resolve(callback(true, result));
			console.log("flickar is ready to serve!!  : ", JSON.stringify(result));
		}
	});
};

//as soon as flickr object is available get the default some data and save to in the db
flickrRestService.prototype.savePublicFeed = function (data) {
	'use strict';
	flickrDataProvider.save(data, function (status, msg) {
		console.log("Request STATUS: " + status + " Request Message: " + msg);
	});
};

exports.flickrRestService = flickrRestService;