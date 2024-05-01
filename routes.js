const express = require('express');
const router =  express.Router('router');
const { signup, loginPage, register, login } = require('./controllers/userController');

router.get('/signup',signup)
router.get('/login',loginPage)

   router.post('/register',register);   

router.post('/login',login)

module.exports = router;