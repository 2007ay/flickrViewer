(function () {
	'use strict';

	angular.module('flickrDemoApp').service("FlickrDataService", ['HTTPService', 'Constants', function (httpService, constants) {

		var self = this;
		self.httpService = httpService;
		self.defaultImageCacheKey = "FlickrDataService_DEFAULTIMAGE";

		//get all the default public feed back this is ther user specific image
		self.getFlickrPublicFeed = function () {
			var reqParams = {
				url: "flickrService/publicFeed",
				cacheKey: self.defaultImageCacheKey,
				params: {}
			}
			return self.httpService.getReq(reqParams).then(function (response) {
				return response;
			});
		};

		//search all the public images by tags name
		self.searchByQuery = function (params) {
			var reqParams = {
				url: "flickrService/searchByTag",
				params: params
			}
			return self.httpService.getReq(reqParams).then(function (response) {
				return response;
			});
		}
    }]);

})();