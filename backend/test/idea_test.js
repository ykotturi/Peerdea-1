const assert = require('assert');
const Group = require('../src/group');
const Member = require('../src/member');
const Idea = require('../src/idea');

describe('Idea test', () => {
	

	var group = new Group({
						keyword: 'secret', 
						illuminate: true
			});
	var member = new Member({
				group_id: group._id, 
				name: 'test'
			});
	var idea;
	var wrongIdea;

	describe('Testing ideas', () => {
		it('Creates an idea', (done) => {

			idea = new Idea({
				member_id: member._id, 
				text: 'test'
			});
			assert(idea != null);
			idea.save()
				.then(() => {
					assert(!idea.isNew);
					done();
				});
		});

		it('Removes an idea', (done) => {
			idea.remove()
				.then(() => Idea.findOne({_id: idea._id}))
				.then((res) => {
					assert(res === null);
					done();
				})
		});

		it('Does not save an idea with the incorrect fields', (done) => {
			wrongIdea = new Idea({
				test: 'test'
			});

			wrongIdea.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

		it('Does not save an idea with missing fields', (done) => {
			wrongIdea = new Idea({
				text: 'secret',
        num_votes: 7
			});

			wrongIdea.validate(err => {
				if (err) {
					return done();
				}
				else {
					throw new Error('Should generate error!');
				}
			});
		});

	    it('Does not save an idea with incorrect member_id field type', (done) => {
	      wrongIdea = new Idea({
	        member_id: 'secret',
	        text: 'test'
	      });

	      wrongIdea.validate(err => {
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
		member.remove();
		done();
	});
	
});