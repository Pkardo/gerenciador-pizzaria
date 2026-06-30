const express = require("express");
const pedidoController = require("../controllers/pedidoController")
const router = express.Router();

router.get("/", pedidoController.listarPedidos);
router.get("/:pedidoId", pedidoController.buscarPedidoPorId);
router.post("/", pedidoController.criarPedido)
router.patch("/:pedidoId/status", pedidoController.alterarStatusPedido)

module.exports = router;