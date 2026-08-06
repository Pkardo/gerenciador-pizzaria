const express = require('express');
const bordaController = require("../controllers/bordaController");
const router = express.Router();

router.get("/", bordaController.listarBorda);
router.get("/:bordaId", bordaController.listarBordaId);
router.post("/", bordaController.criarBorda);
router.put("/:bordaId", bordaController.editarBorda)
router.patch("/:bordaId/status", bordaController.alterarStatusBorda)

module.exports = router;