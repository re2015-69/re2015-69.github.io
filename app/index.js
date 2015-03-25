var http = require('http'),
		express = require('express'),
		app = express(),
		server = http.Server(app),
		io = require('socket.io')(server);


module.exports = server;