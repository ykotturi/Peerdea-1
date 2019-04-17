const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema (
  {
    member_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Member', 
      required: true
    },
    idea_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Idea', 
      required: true
    },
    text: {
      type: String, 
      required: true
    }
  }
);

module.exports = mongoose.model('Review', ReviewSchema);