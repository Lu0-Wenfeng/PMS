const express = require('express');
const router = express.Router();
const { signup, signin, updatePassword } = require('../controllers/auth');
const errorHandler = require("../controllers/error.js");

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout)
router.post('/update', updatePassword)

module.exports = router;