const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

//entry route, that is when the home page loads
router.get('/',homeController.home);

//route to sign up a user
router.get('/users/sign-up',usersController.signUp);

//route to create a user
router.post('/users/create', usersController.createUser);

//route to sign in a user
router.get('/users/sign-in',usersController.signIn);

//route to create a session
router.post('/users/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), usersController.createSession);

router.get('/users/sign-out',usersController.destroySession);

module.exports = router;