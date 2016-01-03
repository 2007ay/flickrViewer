# flickrViewer 
This is very basic examples how to communicate node server to flickr server and fetech all the tagged image from here
Ui is build using angularjs and bootstrap . its just awesome for the begginer. for more detail how to run client and server please follow the below setup

Prerequesitices :
1) one server it could be node, python, iis, tomcat or apache
2) if u wanted to run server also in client machine then need to install	
	a) GIT Bash (MINGW)
	b) install all the below node moduel
	3) run the server u can get the details in server configuration


1) Client
	1) navigate to client folder
	2) in the current app if you server is not ready and u wanted to serve data from locatl then change boolean varaibe stabbed to true 
and update the locatl host port number in the same in URLService.js 
	3) start locatl server
	
	Note: if you are running any expernal server means from cloud or some where else that path we have to update in the URLService self.hostName
	
	
2) Server

 1) install node-modules (install node modules from : https://www.npmjs.com/)
   a) cros
   b) flickrapi
   c) express
   d) mongodb
   e) mongoose
   
 2) now start node server (if u r using ubuntu then write nodejs inplace of node)
	1) navigate to serve folder
	2) node app.js
	
	Note: by default node server is running port no : 8888 
