var //models = require('./models'),
    server = require('./server.js'),
    config = require('./config.js'),
    port = config.httpServer.PORT,
    host = config.httpServer.HOST;

//models.sequelize.sync({ force: false }).then(function () {
  //require('./initDb.js').init(function (err) {
    //if (err) console.error(err);
    server.listen(port, host, function () {
      console.log("Server listening on " + host + ":" + port);
    });
  //})
//});