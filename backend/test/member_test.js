const assert = require('assert');
const Group = require('../src/group');
const Member = require('../src/member');

describe('Member test', () => {
	

	var group = new Group({
						keyword: 'secret', 
						illuminate: true
					});
	var member;
	var wrongMember;

	describe('Testing members', () => {
		it('Creates a member', (done) => {

			member = new Member({
				group_id: group._id, 
				name: 'test'
			});
			assert(member != null);
			member.save()
				.then(() => {
					assert(!member.isNew);
					done();
				});
		});

		it('Removes a member', (done) => {
			member.remove()
				.then(() => Member.findOne({group_id: group._id, name: 'test'}))
				.then((res) => {
					assert(res === null);
					done();
				})
		});

		it('Does not save a member with the incorrect fields', (done) => {
			wrongMember = new Member({
				test: 'test'
			});

			wrongMember.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

		it('Does not save a member with missing fields', (done) => {
			wrongMember = new Member({
				name: 'secret'
			});

			wrongMember.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

	    it('Does not save a member with incorrect group_id field type', (done) => {
	      wrongMember = new Member({
	        group_id: 'secret',
	        name: 'test'
	      });

	      wrongMember.validate(err => {
	        if (err) {
	          return done();
	        }
	        else {
	          throw new Error('Should generate error!');
	        }
	      });
	    });
	});

	after(function(done) {
		group.remove();
		done();
	});
	
});