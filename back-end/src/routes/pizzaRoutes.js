const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const autenticar = require('../middlewares/auth.middleware');
const somenteADM = require('../middlewares/admin.middlewares');

router.get("/", pizzaController.listarPizzas);
router.get("/:pizzaId", pizzaController.buscarPizzaPorId);
router.post("/", autenticar, somenteADM, pizzaController.criarPizza);
router.put("/:pizzaId", pizzaController.editarPizza);
router.patch("/:pizzaId/status", pizzaController.alterarStatusPizza);


module.exports = router;