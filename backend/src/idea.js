const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new Schema (
  {
    member_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Member', 
      required: true
    },
    text: {
      type: String, 
      required: true
    },
    num_votes: {
      type: Number,
      min: 0
    }
  }
);

module.exports = mongoose.model('Idea', IdeaSchema);