const express = require('express');
const bordaController = require("../controllers/bordaController");
const router = express.Router();
const autenticar = require('../middlewares/auth.middleware');
const somenteADM = require('../middlewares/admin.middlewares');

router.get("/", autenticar, bordaController.listarBorda);
router.get("/:bordaId", autenticar, bordaController.listarBordaId);
router.post("/", autenticar, somenteADM, bordaController.criarBorda);
router.put("/:bordaId", autenticar, somenteADM, bordaController.editarBorda);
router.patch("/:bordaId/status", autenticar, bordaController.alterarStatusBorda);

module.exports = router;