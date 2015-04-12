'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  type: String,
  active: Boolean,
  data : Schema.Types.Mixed,
  userNotes : Schema.Types.Mixed,
  publicNotes : String
});

module.exports = mongoose.model('Item', ItemSchema);