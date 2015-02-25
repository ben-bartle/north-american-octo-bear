'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpellSchema = new Schema({
  name: String,
  school: String,
  castingTime: String,
  range: String,
  components: String,
  duration: String,
  description: String,
  level: Number,
  casters: [String]
});

module.exports = mongoose.model('Spell', SpellSchema);

