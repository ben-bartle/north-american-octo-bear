'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemlistSchema = new Schema({
  name: String,
  itemIds: [Schema.Types.ObjectId],
  active: Boolean
});

module.exports = mongoose.model('Itemlist', ItemlistSchema);