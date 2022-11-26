const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/login'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);
module.exports = router;