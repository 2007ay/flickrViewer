/*
Create Singleton db service for all the operations
*/

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var Constants = require('../Constant/Constants').Constants;

var DBServiceProvider = (function () {

	var instance;

	function DBService() {
		this.db;
		this.init();
	}

	DBService.prototype.init = function () {
		this.db = new Db('flickrDB', new Server(Constants.Server.Host, Constants.Server.Port, {
			safe: false
		}, {
			auto_reconnect: true
		}, {}));

		this.open();
	};

	DBService.prototype.open = function () {
		this.db.open(function () {
			console.log("db connection is open now");
		});
	}

	DBService.prototype.close = function () {
		this.db.close();
	}

	function createInstance() {
		var object = new DBService();
		return object;
	}

	// singleton object
	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();


exports.DBServiceProvider = DBServiceProvider;