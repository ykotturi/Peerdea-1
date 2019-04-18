const assert = require('assert');
const Group = require('../src/group');
const Member = require('../src/member');
const Idea = require('../src/idea');
const Review = require('../src/review')

describe('Review test', () => {

  var group = new Group({
            keyword: 'secret', 
            illuminate: true
      });
  var member = new Member({
        group_id: group._id, 
        name: 'test'
      });
  var idea = new Idea({
        member_id: member._id, 
        text: 'test'
      });
  var review;
  var wrongReview;

  describe('Testing reviews', () => {
    it('Creates a review', (done) => {

      review = new Review({
        member_id: member._id, 
        idea_id: idea._id,
        text: 'test'
      });
      assert(review != null);
      review.save()
        .then(() => {
          assert(!review.isNew);
          done();
        });
    });

    it('Removes a review', (done) => {
      review.remove()
        .then(() => Review.findOne({_id: review._id}))
        .then((res) => {
          assert(res === null);
          done();
        })
    });

    it('Does not save an review with the incorrect fields', (done) => {
      wrongReview = new Review({
        test: 'test'
      });

      wrongReview.validate(err => {
        if (err) {
          return done();
        }
        else {
          throw new Error('Should generate error!');
        }
      });
    });

    it('Does not save a review with missing fields', (done) => {
      wrongReview = new Review({
        text: 'secret'
      });

      wrongReview.validate(err => {
        if (err) {
          return done();
        }
        else {
          throw new Error('Should generate error!');
        }
      });
    });

      it('Does not save a review with incorrect member_id field type', (done) => {
        wrongReview = new Review({
          member_id: 'secret',
          idea_id: idea._id,
          text: 'test'
        });

        wrongReview.validate(err => {
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
    idea.remove();
    done();
  });
  
});