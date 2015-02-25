'use strict';

var _ = require('lodash');
var Monster = require('./monster.model');

// Get list of monsters
exports.index = function(req, res) {
  Monster.find(function (err, monsters) {
    if(err) { return handleError(res, err); }
    return res.json(200, monsters);
  });
};

// Get a single monster
exports.show = function(req, res) {
  Monster.findById(req.params.id, function (err, monster) {
    if(err) { return handleError(res, err); }
    if(!monster) { return res.send(404); }
    return res.json(monster);
  });
};

// Creates a new monster in the DB.
exports.create = function(req, res) {
  Monster.create(req.body, function(err, monster) {
    if(err) { return handleError(res, err); }
    return res.json(201, monster);
  });
};

// Updates an existing monster in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Monster.findById(req.params.id, function (err, monster) {
    if (err) { return handleError(res, err); }
    if(!monster) { return res.send(404); }
    var updated = _.merge(monster, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, monster);
    });
  });
};

// Deletes a monster from the DB.
exports.destroy = function(req, res) {
  Monster.findById(req.params.id, function (err, monster) {
    if(err) { return handleError(res, err); }
    if(!monster) { return res.send(404); }
    monster.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}