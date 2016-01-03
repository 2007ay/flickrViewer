(function () {
	'use strict';

	angular.module('flickrDemoApp').config(['$stateProvider', function ($stateProvider) {

		$stateProvider.state({
			name: 'default',
			url: '/',
			templateUrl: '../app/views/flickrFeeds.html',
			controller: "FlickrFeedDetailsCtrl",
			controllerAs: "flickrCtrl"
		});

    }]).run(['$state', function ($state) {
		$state.transitionTo('default');
    }]);

})();