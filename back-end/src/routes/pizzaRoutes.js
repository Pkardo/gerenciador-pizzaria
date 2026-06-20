const express = require('express');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

router.get("/", pizzaController.listarPizzas);
router.get("/:id", pizzaController.buscarPizzaPorId);

module.exports = router;