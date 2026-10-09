const express = require("express");
const pedidoController = require("../controllers/pedidoController")
const router = express.Router();
const autenticar = require("../middlewares/auth.middleware");
const somenteADM = require("../middlewares/admin.middlewares");

router.get("/", autenticar, pedidoController.listarPedidos);
router.get("/:pedidoId", autenticar, pedidoController.buscarPedidoPorId);
router.post("/", autenticar, pedidoController.criarPedido);
router.patch("/:pedidoId/status", autenticar, pedidoController.alterarStatusPedido)
router.put("/:pedidoId", autenticar, pedidoController.editarPedido);

module.exports = router;