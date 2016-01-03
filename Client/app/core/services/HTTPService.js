(function () {
	'use strict';

	angular.module("flickrDemoApp").service("HTTPService", ['$http', 'URLService', '$q', 'cacheService', function (http, urlService, q, cache) {

		var self = this;
		self.http = http;
		this.q = q;
		self.urlService = urlService;
		self.cache = cache;
		self.reqParams;

		self.getDataFromCache = function () {
			var cachedData;
			if (self.reqParams.cacheKey) {
				cachedData = self.cache.get(self.reqParams.cacheKey);
			}
			return cachedData;
		}

		self.getReq = function (reqParams) {
			self.reqParams = reqParams || {};
			var cachedData = self.getDataFromCache();
			if (!cachedData) {
				return self.http({
					method: 'GET',
					url: self.urlService.getUrl(reqParams.url),
					params: self.reqParams.params
				}).then(function (response) {
					cachedData = response.data;
					if (self.reqParams.cacheKey) {
						self.cache.put(self.reqParams.cacheKey, cachedData);
					}
					console.log("Request is successfully done for url : " + self.url);
					return cachedData;
				}, function (msg) {
					console.log("Request is failed for url : " + self.url + "and the error msg is " + msg);
					return cachedData;
				});
			} else {
				return cachedData;
			}
		};

		self.postReq = function (reqParams) {
			self.reqParams = reqParams;
			var cachedData = self.getDataFromCache();
			if (!cachedData) {
				var deferred = new self.q.defer();
				var request = new XMLHttpRequest();
				request.open('POST', self.urlService.getUrl(self.reqParams.url), true);
				request.send(JSON.stringify(self.reqParams.postData));
				request.onreadystatechange = function () {
					if ((request.readyState == 4) && (request.status == 200)) {
						console.log("Request is done");
						var data = JSON.parse(request.responseText)
						self.cache.put(self.reqParams.cacheKey, data);
						deferred.resole(data);
					} else if ((request.readyState == 4) && (request.status != 200)) {
						console.log("Error in Connection");
						deferred.reject(request.responseText);
					}
				}
				return deferred.promise;
			} else {
				return cachedData
			}
		}
	}]);
})();