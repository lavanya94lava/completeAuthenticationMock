const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

//entry route, that is when the home page loads
router.get('/',homeController.home);

//various routes for user
router.use("/users",require("./users"));

module.exports = router;