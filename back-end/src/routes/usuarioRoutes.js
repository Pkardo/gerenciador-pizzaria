const express = require('express');
const router = express.Router();
const usuarioController = require('../config/usuarioController');
const autenticar = require('../middlewares/auth.middleware');
const somenteADM = require('../middlewares/admin.middlewares');

router.post("/", autenticar, somenteADM, usuarioController.criarUsuario);

module.exports = router;