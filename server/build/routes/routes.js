"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('../controllers/controller'), submitForm = _a.submitForm, viewForms = _a.viewForms, getForm = _a.getForm, updateForm = _a.updateForm;
var express = require('express');
var router = express.Router();
router.post('/', submitForm);
router.get('/:id', getForm);
router.get('/', viewForms);
router.put('/:id', updateForm);
module.exports = router;
