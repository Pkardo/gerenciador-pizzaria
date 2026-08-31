const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const connection = require('./config/database');
const pizzaController = require('./controllers/pizzaController');
const pizzaRoutes = require('./routes/pizzaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const bordaRoutes = require('./routes/bordaRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');


app.use("/pizzas", pizzaRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/bordas", bordaRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/login", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});