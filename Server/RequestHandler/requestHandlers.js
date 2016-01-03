debugger;
var routeMap = new require("./appRouter").appRouter();

//This function will rout to the corrensponding
//javascript module which is maped in routerMap object
var handleRequest = function (request, response, endPointName, callback) {

	if (routeMap[endPointName] !== undefined) {
		routeMap[endPointName](request, response, callback);
		return true;
	} else {
		console.log(" invalid url...");
		return false; // not found
	}
}

exports.handleRequest = handleRequest;