'use strict';

var _ = require('lodash');
var Item = require('./item.model');

// Get list of items
exports.index = function(req, res) {
  Item.find(function (err, items) {
    if(err) { return handleError(res, err); }
    //strip the notes off of the items for the list
    for (var i =0 ; i < items.length;i++){
      items[i].userNotes = '';
      items[i].publicNotes = '';
    }
    return res.json(200, items);
  });
};

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    console.log(item);
    item = processNotesForItem(req,item);
    console.log('-------------');
    console.log(item);
    return res.json(item);
  });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
   // var updated = _.merge(item, req.body);
   // updated.save(function (err) {
    item.data = req.body.data || {};
    item.markModified('data');
    item.userNotes = item.userNotes || {};
    item.userNotes[req.user._id] = req.body.userNotes;
    item.markModified('userNotes');
    
    item.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, item);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function processNotesForItem(req,item){
    if (!req.user){
      item.userNotes = 'none';
      return item;
    }
    if (!item.userNotes){
      item.userNotes = '';
      return item;
    }
    item.userNotes = item.userNotes[req.user._id];
    return item;
}

function handleError(res, err) {
  return res.send(500, err);
}