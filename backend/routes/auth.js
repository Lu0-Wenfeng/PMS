const express = require('express');
const router = express.Router();
const { signup, signin, updatePassword } = require('../controllers/auth');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout',logout)
router.post('/update',updatePassword)

module.exports = router;