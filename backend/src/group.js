const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    keyword: {
      type: String, 
      required: true
    },
    illuminate: {
      type: Boolean, 
      required: true
    }
  }
);

module.exports = mongoose.model('Group', GroupSchema);