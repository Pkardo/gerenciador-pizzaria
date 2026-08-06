const express = require("express");
const connection = require("../config/database");

function listarBorda(req, res) {
    connection.query('SELECT * FROM bordas',
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: "Erro ao buscar bordas",
                    erro: error.message,
                    code: error.code
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Nenhum resultado encontrado"
                });
            }

            res.json(results);
        });
}

function listarBordaId(req, res) {
    const { bordaId } = req.params;

    connection.query(`SELECT * FROM bordas WHERE id = ?`, [bordaId],
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: "Erro ao buscar borda",
                    erro: error.message,
                    code: error.code
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Borda não encontrada"
                });
            }

            res.json(results);
        });
}

function criarBorda(req, res) {
    const { nome, preco, ativa } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({
            mensagem: 'O campo é obrigatório e aceita apenas valor em texto'
        });
    }

    if (preco !== undefined && (isNaN(Number(preco)) || Number(preco) < 0 || typeof preco === 'boolean')) {
        return res.status(400).json({
            mensagem: "O campo preco precisa ser um número válido não negativo"
        });
    }
    const precoVal = preco !== undefined ? Number(preco) : null
    const ativaVal = typeof ativa === 'boolean' ? ativa : true

    connection.query(`INSERT INTO bordas (nome, preco, ativa) VALUES (?, ?, ?)`, [nome, precoVal, ativaVal],
        (errorItens) => {
            if (errorItens) {
                console.log(errorItens);

                return res.status(500).json({
                    mensagem: "Erro ao criar borda",
                    erro: errorItens.message,
                    code: errorItens.code
                });
            }

            res.status(201).json({
                mensagem: "Borda criada com sucesso!"
            });
        }
    );
}

function editarBorda(req, res) {
    const { bordaId } = req.params;
    const { nome, preco, ativa } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({
            mensagem: 'O campo é obrigatório e aceita apenas valor em texto'
        });
    }

    if (preco !== undefined && isNaN(Number(preco)) || Number(preco) < 0) {
        return res.status(400).json({
            mensagem: "O campo preco precisa ser um número válido não negativo"
        });
    }
    const precoVal = preco !== undefined ? Number(preco) : null
    const ativaVal = typeof ativa === 'boolean' ? ativa : true

    connection.query(`UPDATE bordas SET nome = ?, preco = ?, ativa = ? WHERE id = ?`,
        [nome, precoVal, ativaVal, bordaId],
        (errorItens, results) => {
            if (errorItens) {
                return res.status(500).json({
                    mensagem: "Erro ao editar borda",
                    erro: errorItens.message,
                    code: errorItens.code
                })
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Borda não encontrada"
                })
            }
            res.status(201).json({
                mensagem: "Borda editada com sucesso!"
            })
        }
    )
}

function alterarStatusBorda(req, res) {
    const { bordaId } = req.params;
    const { ativa } = req.body;

    if (ativa !== undefined && typeof ativa !== 'boolean') {
        return res.status(400).json({
            mensagem: "O campo ativa deve ser true ou false"
        })
    }
    

    connection.query('UPDATE bordas SET ativa = ? WHERE id = ?',
        [ativa, bordaId],
        (error, results) => {
            if (error) {
                console.log(error)

                return res.status(500).json({
                    mensagem: "Erro ao alterar Status.",
                    erro: error.message,
                    code: error.code
                });
            }

            if (results.affectedRows === 0) {

                return res.status(404).json({
                    mensagem: "Borda não encontrada"
                });
            }

            res.status(201).json({
                mesangem: `${ativa ? "Borda Ativada com Sucesso!" : "Borda Desativada com sucesso"}`
            })
        }

    )
}


module.exports = {
    listarBorda,
    listarBordaId,
    criarBorda,
    editarBorda,
    alterarStatusBorda
};