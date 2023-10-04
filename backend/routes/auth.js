const express = require('express');
const router = express.Router();
const { signup, signin, updatePassword } = require('../controllers/auth');
const errorHandler = require("../controllers/error.js");

router.post('/sign-up', signup);
router.post('/sign-in', signin);
// router.post('/logout', logout)
router.post('/update-pwd', updatePassword)

module.exports = router;