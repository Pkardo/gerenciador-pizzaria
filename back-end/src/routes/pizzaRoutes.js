const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const autenticar = require('../middlewares/auth.middleware');
const somenteADM = require('../middlewares/admin.middlewares');

router.get("/", autenticar, pizzaController.listarPizzas);
router.get("/:pizzaId", autenticar, pizzaController.buscarPizzaPorId);
router.post("/", autenticar, somenteADM, pizzaController.criarPizza);
router.put("/:pizzaId", autenticar, somenteADM, pizzaController.editarPizza);
router.patch("/:pizzaId/status", autenticar, pizzaController.alterarStatusPizza);


module.exports = router;