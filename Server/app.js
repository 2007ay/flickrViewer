 // this guy delegate responsibilty to the related javascript module
 var requestHandlers = require("./RequestHandler/requestHandlers");

 //to start node server
 var appServer = require("./RequestHandler/server").appServer;
 var server = new appServer()
 server.start(requestHandlers);