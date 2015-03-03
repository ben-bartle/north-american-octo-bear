'use strict';

var express = require('express');
var controller = require('./itemlist.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', 		controller.index);			// auth.isAuthenticated(), 
router.get('/:id', 		controller.show);			// auth.isAuthenticated(), 
router.post('/', 		controller.create);			// auth.isAuthenticated(), 
router.put('/:id', 		controller.update);			// auth.isAuthenticated(), 
router.patch('/:id', 		controller.update);		// auth.isAuthenticated(), 
router.delete('/:id', 		controller.destroy);	// auth.isAuthenticated(), 

module.exports = router;