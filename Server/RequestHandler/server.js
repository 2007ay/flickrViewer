var http = require("http");
var url = require('url');
var cros = require('cors');
var querystring = require('querystring');

var appServer = function () {
	this.server;
	this.requestHandlers;
}

appServer.prototype.start = function (requestHandlers) {

	var self = this;
	self.requestHandlers = requestHandlers;

	self.server = http.createServer(function (request, response) {

		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

		var parts = url.parse(request.url, true);
		var endPoint = parts.pathname;
		try {
			self.requestHandlers.handleRequest(request, response, endPoint, function (st, res) {
				response.json({
					status: st,
					result: res
				});
				response.end();
			});

		} catch (err) {
			console.log("Some error is occured in starting server : " + err);
		}
	}).listen(8888);
	console.log("Sever is started and Waiting for client Request...at localhost:8888");
};

appServer.prototype.stopSever = function () {
	this.server.close(function () {
		console.log('Server closed!');
	});
}

module.exports.appServer = appServer;