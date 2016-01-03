(function () {
	'use strict';

	angular.module("flickrDemoApp").service("URLService", ['$http', function (http) {

		var self = this;
		self.url;
		self.stabbed = false;
		self.hostName = "http://ec2-54-169-50-147.ap-southeast-1.compute.amazonaws.com/";
		self.localHostName = "http://localhost:8000/";

		self.getStabbedUrl = function () {
			return self.localHostName + "/json/" + self.url + ".json";
		}

		self.hostUrl = function () {
			return self.hostName + self.url;
		};
		self.getUrl = function (url) {

			self.url = url;

			if (self.stabbed) {
				return self.getStabbedUrl();
			} else {
				return self.hostUrl();
			}
		};
}]);

})();