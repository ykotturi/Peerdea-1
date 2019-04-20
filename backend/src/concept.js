const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConceptSchema = new Schema (
  {
    group_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Group', 
      required: true
    },
    name: {
      type: String,
      required: true
    },
    media: { 
      data: Buffer, 
      contentType: String
    },
    description: {
      type: String, 
      required: true
    },
    yes: {
      type: Number,
      min: 0
    },
    yesand: {
      type: [String]
    }
  }
);

module.exports = mongoose.model('Concept', ConceptSchema);