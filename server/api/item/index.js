'use strict';

var express = require('express');
var controller = require('./item.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);		//
router.get('/:id', auth.isAuthenticated(), controller.show);		//auth.isAuthenticated(),
router.post('/', auth.isAuthenticated(), controller.create);		//auth.isAuthenticated(),
router.put('/:id', auth.isAuthenticated(), controller.update);		//auth.isAuthenticated(),
router.patch('/:id', auth.isAuthenticated(), controller.update);		//auth.isAuthenticated(),
router.delete('/:id', auth.isAuthenticated(), controller.destroy);	//auth.isAuthenticated(),

module.exports = router;