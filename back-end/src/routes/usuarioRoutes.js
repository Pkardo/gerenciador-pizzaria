const express = require('express');
const router = express.Router();
const usuarioController = require('../config/usuarioController');

router.post("/", usuarioController.criarUsuario);

module.exports = router;