import { Request, Response } from "express";
const {submitForm , viewForms, getForm, updateForm} =  require('../controllers/controller')
const express = require('express');
const router = express.Router();



router.post('/', submitForm);
router.get('/:id', getForm);
router.get('/', viewForms);
router.put('/:id', updateForm)

module.exports = router;