(function () {
	'use strict';

	angular.module('flickrDemoApp').controller("FlickrFeedDetailsCtrl", ['FlickrDataService', function (flickrDataService) {

		var self = this;
		self.publicFeedList = [];
		self.searchByTagVal;
		self.flickrDataService = flickrDataService;
		self.noResult = {
			emptyStringMsg: "No Matching result is found !!!",
			imgUrl: "images/image_not_found.jpg",
		};

		self.searchByTag = function () {
			self.publicFeedList = [];
			var params = {
				tags: self.searchByTagVal
			};
			self.flickrDataService.searchByQuery(params).then(function (searchList) {
				self.publicFeedList = searchList;
			});
		};

		self.getViewData = function () {
			self.flickrDataService.getFlickrPublicFeed().then(function (imageList) {
				self.publicFeedList = imageList;
			});
		}

		self.onDefaultDataLoad = function () {
			this.getViewData();
		}

		this.getViewData();

    }]);

})();