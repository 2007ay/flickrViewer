//1. require each service
//2. create an object and map each function to one key .Basically this key is again and url
module.exports.appRouter = function () {

	debugger;
	var flickrRestService = require("./flickrRestService").flickrRestService;
	flickrRestService = new flickrRestService();
	var map = {};
	map["/flickrRestService/getFlickrPublicFeed"] = flickrRestService.getFlickrPublicFeed;
	map["/flickrRestService/searchByQuery"] = flickrRestService.searchByQuery;
	return map;
}