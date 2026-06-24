const express = require("express")
const connection = require("../config/database")

function listarPedidos(req, res) {
    connection.query(
        'SELECT * FROM pedidos', (error, results) => {
            if (error) {
                return res.status(500).json({
                    mensagem: 'Erro ao buscar pedidos',
                    erro: error.message
                })
            }

            res.json(results)
        }
    )
}

function buscarPedidoPorId(req, res) {
    const { pedidoId } = req.params;

    connection.query(
        'SELECT * FROM pedidos WHERE id = ?', [pedidoId],
        (error, results) => {
            if (error) {
                console.log(error)

                return res.status(500).json({
                    mensagem: 'Erro ao buscar pedidos',
                    erro: error.message
                })
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: 'Pedido não encontrado'
                })
            }

            res.json(results[0])
        }
    )
}

function criarPedido(req, res) {
    const {
        nome_cliente,
        email_cliente,
        telefone_cliente,
        logradouro,
        numero,
        bairro,
        cidade,
        cep,
        ponto_referencia,
        forma_pagamento,
        troco_para,
        status_pagamento,
        observacoes,
        valor_total,
        itens_pedido
    } = req.body;

    connection.query(
        'INSERT INTO pedidos (nome_cliente, email_cliente, telefone_cliente, logradouro, numero, bairro, cidade, cep, ponto_referencia, forma_pagamento, troco_para, status_pagamento, observacoes, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

        [nome_cliente,
            email_cliente,
            telefone_cliente,
            logradouro,
            numero,
            bairro,
            cidade,
            cep,
            ponto_referencia,
            forma_pagamento,
            troco_para,
            status_pagamento,
            observacoes,
            valor_total],

        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: 'Erro ao criar pedido',
                    erro: error.message
                })
            }

            const pedidoId = results.insertId

            res.status(201).json({
                mensagem: 'Pedido criado com sucesso!',
                pedidoId: results.insertId
            })
        }
    )
}

module.exports = {
    listarPedidos,
    buscarPedidoPorId,
    criarPedido
};