'use strict';

var _ = require('lodash');
var Spell = require('./spell.model');

// Get list of spells
exports.index = function(req, res) {
  Spell.find(function (err, spells) {
    if(err) { return handleError(res, err); }
    return res.json(200, spells);
  });
};

// Get a single spell
exports.show = function(req, res) {
  Spell.findById(req.params.id, function (err, spell) {
    if(err) { return handleError(res, err); }
    if(!spell) { return res.send(404); }
    return res.json(spell);
  });
};

// Creates a new spell in the DB.
exports.create = function(req, res) {
  Spell.create(req.body, function(err, spell) {
    if(err) { return handleError(res, err); }
    return res.json(201, spell);
  });
};

// Updates an existing spell in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Spell.findById(req.params.id, function (err, spell) {
    if (err) { return handleError(res, err); }
    if(!spell) { return res.send(404); }
    var updated = _.merge(spell, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, spell);
    });
  });
};

// Deletes a spell from the DB.
exports.destroy = function(req, res) {
  Spell.findById(req.params.id, function (err, spell) {
    if(err) { return handleError(res, err); }
    if(!spell) { return res.send(404); }
    spell.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}