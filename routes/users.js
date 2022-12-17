const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/login'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// With respect to google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/login' }), usersController.createSession);

module.exports = router;