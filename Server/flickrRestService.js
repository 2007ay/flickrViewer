var Constants = require('./Constant/Constants').Constants;
var InstanceProvider = require("./flickrInstance").flickrInstance;
var mongoose = require('mongoose');
var Image = require('./models/image.js');
var Q = require('q');
var instance = new InstanceProvider();
//var flickrDataProvider = new dataProvider();

console.log("first");
function convertRawToImg(val){
	var newImage = new Image({
		    				id: val.id,
							owner: val.owner,
							secret: val.secret,
							server: val.server,
							farm: val.farm,
							title: val.title,
							ispublic: val.ispublic,
							isfriend: val.isfriend,
							isfamily: val.isfamily,
							imgUrl : 'https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '.jpg'
						});
	return newImage;
}

function flickrRestService() {
console.log("inside");
	'use strict';
	var self = this;
	self.flickrInstance = null; // this is the flickar instacnce for futrue uses
	instance.getInstance().then(function (instance) {
		console.log("third");
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
					var newImage =convertRawToImg(val);	
						newImage.save(function(err) {
							if (err) {console.log(err);}
							else {console.log('User created!');}
						});
					});
					
				}
			});
		}
	});
}

//if you know the user name and wanted to get the snid .. then use this functionlity
flickrRestService.prototype.searchByQuery = function (params) {
	'use strict';
    console.log(params);
	var deferred = Q.defer();

	    this.flickrInstance.photos.search({
		api_key: Constants.flickrOptions.apiKey,
		tags:params,
		progress: false
	}, function (err, result) {

		if (err) {
			deferred.reject(err);
			console.log("unable to flickar get the result!!" + JSON.stringify(err));
		} else if (result && result.photos) {
					var downloadPhotos = [];
					result.photos.photo.forEach(function (val) {
					var newImage =convertRawToImg(val);	
						downloadPhotos.push(newImage);
					});			
				
			deferred.resolve(downloadPhotos);
			console.log("flickar is ready to serve!!  : ", JSON.stringify(result));
		}
	});
	return deferred.promise;
};

exports.flickrRestService = flickrRestService;