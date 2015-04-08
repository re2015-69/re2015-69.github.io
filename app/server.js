var http = require('http'),
		express = require('express'),
		app = express(),
		routes = require('./routes'),
		server = http.Server(app),
		io = require('socket.io')(server);

routes(app, io);

module.exports = server;