var http = require('http'),
		express = require('express'),
		app = express(),
		routes = require('./routes'),
		server = http.Server(app),
		io = require('socket.io')(server);

require("./draw-server-api.js")( io );

routes(app, io);

module.exports = server;