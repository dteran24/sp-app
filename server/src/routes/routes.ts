import { Request, Response } from "express";
const {submitForm , viewForms} =  require('../controllers/controller')
const express = require('express');
const router = express.Router();



router.post('/', submitForm);
router.get('/', viewForms)

module.exports = router;