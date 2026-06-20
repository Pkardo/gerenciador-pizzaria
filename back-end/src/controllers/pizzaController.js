const connection = require("../config/database");

function listarPizzas(req, res) {
    connection.query('SELECT * FROM pizzas', (error, results) => {
        if (error) {
            return res.status(500).json({
                mensagem: 'Erro ao buscar pizzas'
            });
        }

        res.json(results);
    })
}

function buscarPizzaPorId(req, res) {
    const { id } = req.params;

    connection.query(
        'SELECT * FROM pizzas WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                res.status(500).json({
                    mensagem: 'Erro ao buscar pizza'
                })
            }
            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: 'Pizza não encontrada'
                })
            }

            res.json(results[0]);
        }
    )
}

module.exports = {
    listarPizzas,
    buscarPizzaPorId
};