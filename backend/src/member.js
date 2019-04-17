const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema (
  {
    group_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Group',
      required: true
    },
  }
);

module.exports = mongoose.model('Member', MemberSchema);