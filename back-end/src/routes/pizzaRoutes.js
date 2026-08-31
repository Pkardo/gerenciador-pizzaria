const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

router.get("/", pizzaController.listarPizzas);
router.get("/:pizzaId", pizzaController.buscarPizzaPorId);
router.post("/", pizzaController.criarPizza);
router.put("/:pizzaId", pizzaController.editarPizza);
router.patch("/:pizzaId/status", pizzaController.alterarStatusPizza);


module.exports = router;