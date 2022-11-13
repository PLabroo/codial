// Creating routes and fetching controllers by home_controller file 
// Aim is to create routes and controllers separately

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')


router.get('/', homeController.home);
router.use('/users', require('./users'));
// router.use('/posts',require('./'))
// router.get('/user', homeController.user);
module.exports = router;