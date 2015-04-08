var path = require('path');
var express = require('express');

module.exports = function (app, io) {
	app.use(express.static(__dirname + '/../../public/css'));
	app.use(express.static(__dirname + '/../../public/html'));
	app.use(express.static(__dirname + '/../../public/js'));

	app.get('/draw', function (req, res) {
		res.sendFile(path.resolve(__dirname + '/../../public/html/draw.html'));
	});

	var drawIO = io.of('/draw');
	drawIO.on('connection', function (socket) {
		socket.on('disconnect', function () {
		});

		//socket.on('')
	})
}