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

            const pedido = results[0]

            connection.query(
                `SELECT
                itens_pedido.id,
                itens_pedido.tamanho,
                itens_pedido.quantidade,
                itens_pedido.valor_unitario,
                itens_pedido.observacoes,
                pizzas.nome AS pizza,
                bordas.nome AS borda
                FROM itens_pedido
                JOIN pizzas ON itens_pedido.pizza_id = pizzas.id
                LEFT JOIN bordas ON itens_pedido.borda_id = bordas.id
                WHERE itens_pedido.pedido_id = ?`, [pedidoId],
                (errorItens, itens) => {
                    if (errorItens) {
                        console.log(errorItens)

                        return res.status(500).json({
                            mensagem: 'Erro ao criar o pedido',
                            erro: errorItens
                        })
                    }

                    res.json({
                        ...pedido,
                        itens_pedido: itens
                    })
                }
            )
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

            if (!Array.isArray(itens_pedido) || itens_pedido === 0) {
                return res.status(400).json({
                    mensagem: "O pedido precisa ter pelo menos um item"
                });
            }

            const valoresItens = itens_pedido.map((item) => [
                pedidoId,
                item.pizza_id,
                item.borda_id,
                item.tamanho,
                item.quantidade,
                item.valor_unitario,
                item.observacoes
            ]);

            connection.query(
                `INSERT INTO itens_pedido (
                pedido_id, 
                pizza_id, 
                borda_id, 
                tamanho, 
                quantidade, 
                valor_unitario, 
                observacoes) VALUES ?`, [valoresItens],
                (errorItens) => {
                    if (errorItens) {
                        console.log(errorItens);

                        return res.status(500).json({
                            mensagem: 'Erro ao salvar os itens do pedido',
                            erro: errorItens.message
                        })
                    }

                    res.status(201).json({
                        mensagem: 'Pedido criado com sucesso!',
                        pedidoId: results.insertId
                    })
                }
            )
        }
    )
}

module.exports = {
    listarPedidos,
    buscarPedidoPorId,
    criarPedido
};