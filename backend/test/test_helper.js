const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbRoute = "mongodb://dronut-user:dronuts@cluster0-shard-00-00-hpghn.azure.mongodb.net:27017,cluster0-shard-00-01-hpghn.azure.mongodb.net:27017,cluster0-shard-00-02-hpghn.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

//Before starting the test, create sandboxed database connection
before(function (done) {
	mongoose.connect(dbRoute, { useNewUrlParser: true });
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function () {
		console.log('We are connected to the test database');
		done();
	});
});

after(function(done) {
	mongoose.connection.close(done);
});