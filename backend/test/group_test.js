const assert = require('assert');
const Group = require('../src/group');

describe('Group test', () => {

	var group;
	var wrongGroup;

	describe('Testing groups', () => {
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
				.then(() => Group.findOne({_id: group._id}))
				.then((res) => {
					if (res === null) {done();}
					else {throw new Error('Should remove group');}
				})
		});

		it('Does not save a group with the incorrect fields', (done) => {
			wrongGroup = new Group({
				test: 'test'
			});

			wrongGroup.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

		it('Does not save a group with missing fields', (done) => {
			wrongGroup = new Group({
				keyword: 'secret'
			});

			wrongGroup.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

    it('Does not save a group with incorrect illuminate field type', (done) => {
      wrongGroup = new Group({
        keyword: 'secret',
        illuminate: 'test'
      });

      wrongGroup.validate(err => {
        if (err) {
          return done();
        }
        else {
          throw new Error('Should generate error!');
        }
      });
    });
	});
});