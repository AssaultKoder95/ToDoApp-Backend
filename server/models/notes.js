const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  }
}, {timestamps: true});

var Notes = mongoose.model('Note', noteSchema);
module.exports = Notes;
