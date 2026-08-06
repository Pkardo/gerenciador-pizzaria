const { response } = require("express");
const connection = require("../config/database");

function listarPizzas(req, res) {
    connection.query('SELECT * FROM pizzas', (error, results) => {
        if (error) {
            console.log(error);

            return res.status(500).json({
                mensagem: 'Erro ao buscar pizzas',
                erro: error.message
            });
        }

        res.json(results);
    })
}

function buscarPizzaPorId(req, res) {
    const { pizzaId } = req.params;

    connection.query(
        'SELECT * FROM pizzas WHERE id = ?', [pizzaId],
        (error, results) => {
            if (error) {
                console.log(error);

                res.status(500).json({
                    mensagem: 'Erro ao buscar pizza',
                    erro: error.message
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

function criarPizza(req, res) {
    const { nome, descricao, preco } = req.body;

    connection.query(
        'INSERT INTO pizzas (nome, descricao, preco) VALUES (?, ?, ?)',
        [nome, descricao, preco],
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: 'Erro ao criar pizza',
                    erro: error.message
                });
            }

            res.status(201).json({
                mensagem: 'Pizza criada com sucesso!'
            });
        }
    )
}

function editarPizza(req, res) {
    const { pizzaId } = req.params;
    const { nome, descricao, preco } = req.body;

    connection.query(
        'UPDATE pizzas SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
        [nome, descricao, preco, pizzaId],
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: 'Erro ao editar a pizza',
                    erro: error.message
                })
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Pizza não encontrada'
                })
            }

            res.status(200).json({
                mensagem: 'Pizza atualizada com sucesso!'
            })
        }
    )
}

function alterarStatusPizza(req, res) {
    const { pizzaId } = req.params;
    const { ativa } = req.body;

    if (ativa !== undefined && typeof ativa !== 'boolean') {
        return res.status(400).json({
            mesangem: "O campo ativa deve ser true ou false"
        })
    }

    connection.query(
        'UPDATE pizzas SET ativa = ? WHERE id = ?',
        [ativa, pizzaId],
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: 'Erro ao desativar pizza',
                    erro: error.message
                })
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Pizza não encontrada'
                })
            }

            res.status(200).json({
                mensagem: `${ativa ? 'Pizza Ativada com sucesso' : 'Pizza desativada com sucesso'}`
            })

        }
    )
}

module.exports = {
    listarPizzas,
    buscarPizzaPorId,
    criarPizza,
    editarPizza,
    alterarStatusPizza
};