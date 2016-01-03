angular.module('flickrDemoApp').factory('cacheService', ['$cacheFactory', function ($cacheFactory) {

	var cacheFactory = $cacheFactory('flickrCacheService', {
		capacity: 3 // optional - turns the cache into LRU cache
	});

	return cacheFactory;
}]);