const mongoose = require('mongoose');
const assert = require('assert');
const Group = require('../src/group');

const dbRoute = "mongodb://dronut-user:dronuts@cluster0-shard-00-00-hpghn.azure.mongodb.net:27017,cluster0-shard-00-01-hpghn.azure.mongodb.net:27017,cluster0-shard-00-02-hpghn.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

describe('Database test', () => {
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

	var group;
	var wrongGroup;

	describe('Creating groups', () => {
		it('Creates a group', (done) => {
			group = new Group({
				keyword: 'secret', 
				illuminate: true
			});
			assert(group != null);
			group.save()
				.then(() => {
					assert(!group.isNew);
					done();
				});
		});

		it('Removes a group', (done) => {
			group.remove()
				.then(() => Group.findOne({keyword: 'secret', illuminate: true}))
				.then((res) => {
					assert(res === null);
					done();
				})
		});

		it('Does not save a group with the incorrect fields', (done) => {
			wrongGroup = new Group({
				test: 'test'
			});

			wrongGroup.save(err => {
				if (err) {
					return done();
				}
				else {
					wrongGroup.remove();
					throw new Error('Should generate error!');
				}
			});
		});

		it('Does not save a group with missing fields', (done) => {
			wrongGroup = new Group({
				keyword: 'secret'
			});

			wrongGroup.save(err => {
				if (err) {
					return done();
				}
				else {
					wrongGroup.remove();
					throw new Error('Should generate error!');
				}
			});
		});

    it('Does not save a group with incorrect illuminate field type', (done) => {
      wrongGroup = new Group({
        keyword: 'secret',
        illuminate: 'test'
      });

      wrongGroup.save(err => {
        if (err) {
          return done();
        }
        else {
          wrongGroup.remove();
          throw new Error('Should generate error!');
        }
      });
    });
	});

	after(function(done) {
		// group.remove();
		mongoose.connection.close(done);
	});
	
});