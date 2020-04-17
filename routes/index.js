const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

const SITE_KEY = "6Ld9ZuoUAAAAAL_GGpws8a2rdT7JJYMJkkecTgDN";
const SECRET_KEY = "6Ld9ZuoUAAAAAF3jU7qv4idhY8k4I2cco7clF-y1";

const recaptcha = new Recaptcha(SITE_KEY, SECRET_KEY, {callback:'cb'});

//entry route, that is when the home page loads
router.get('/',homeController.home);

//route to sign up a user
router.get('/users/sign-up',recaptcha.middleware.render,usersController.signUp);

//route to create a user
router.post('/users/create',recaptcha.middleware.verify, usersController.createUser);

//route to sign in a user
router.get('/users/sign-in',recaptcha.middleware.render,usersController.signIn);

//route to create a session
router.post('/users/create-session',recaptcha.middleware.verify,passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), usersController.createSession);

//logout a user
router.get('/users/sign-out',usersController.destroySession);

//reset password of a signedin user
router.get('/users/reset-password/:token',usersController.resetPasswordForm);

//post data about resetForm and send mail
router.post('/users/reset-password-action/:token',usersController.resetPasswordAction);

//forgot password form
router.get('/users/forgot-password', usersController.forgotPassword);

//post data about forgot password and send mail
router.post('/users/forgot-password-action',usersController.forgotPasswordAction);

module.exports = router;