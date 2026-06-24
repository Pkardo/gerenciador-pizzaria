const express = require("express");
const app = express();
app.use(express.json());

const connection = require('./config/database');
const pizzaController = require('./controllers/pizzaController');
const pizzaRoutes = require('./routes/pizzaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

app.use("/pizzas", pizzaRoutes);
app.use("/pedidos", pedidoRoutes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});