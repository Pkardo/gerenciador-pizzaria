const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const autenticar = require('../middlewares/auth.middleware');
const somenteADM = require('../middlewares/admin.middlewares');

const router = express.Router();

router.get("/", autenticar, somenteADM, dashboardController.dashboard);

module.exports = router;