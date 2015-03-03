'use strict';

var _ = require('lodash');
var Itemlist = require('./itemlist.model');
var Item = require('../item/item.model');

// Get list of itemlists
exports.index = function(req, res) {
  Itemlist.find(function (err, itemlists) {
    if(err) { return handleError(res, err); }
    return res.json(200, itemlists);
  });
};

// Get a single itemlist
exports.show = function(req, res) {
  Itemlist.findById(req.params.id).lean().exec(function (err, itemlist) {
    if(err) { return handleError(res, err); }
    if(!itemlist) { return res.send(404); }

    //extract the items that match these ids
    Item.find({}).where('_id').in(itemlist.itemIds).exec(function(err,items){
      itemlist.items = items;
      return res.json(itemlist);
    });
  });
};

// Creates a new itemlist in the DB.
exports.create = function(req, res) {
  Itemlist.create(req.body, function(err, itemlist) {
    if(err) { return handleError(res, err); }
    return res.json(201, itemlist);
  });
};

// Updates an existing itemlist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Itemlist.findById(req.params.id, function (err, itemlist) {
    if (err) { return handleError(res, err); }
    if(!itemlist) { return res.send(404); }
    var updated = _.merge(itemlist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, itemlist);
    });
  });
};

// Deletes a itemlist from the DB.
exports.destroy = function(req, res) {
  Itemlist.findById(req.params.id, function (err, itemlist) {
    if(err) { return handleError(res, err); }
    if(!itemlist) { return res.send(404); }
    itemlist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}