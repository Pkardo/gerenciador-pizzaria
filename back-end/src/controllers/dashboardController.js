const connection = require('../config/database');

function dashboard(req, res) {
    connection.query(`
        SELECT COUNT(*) AS totalPedidos,
        SUM(valor_total) AS faturamentoTotal,
        SUM(CASE
                WHEN status_pedido = 'em_preparo'
                THEN 1
                ELSE 0
            END) AS pedidosEmPreparo,

            SUM(CASE
                WHEN status_pedido = 'entregue'
                THEN 1
                ELSE 0
            END) AS pedidosEntregues,

            SUM(CASE
                WHEN status_pedido = 'cancelado'
                THEN 1
                ELSE 0
            END) AS pedidosCancelados

        FROM pedidos;`,

        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: "Erro ao buscar Total de pedidos",
                    erro: error.message,
                    code: error.code
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Total de Pedidos não encontrado!"
                })
            }

            res.json({
                totalPedidos: results[0].totalPedidos,
                faturamentoTotal: results[0].faturamentoTotal,
                pedidosEmPreparo: results[0].pedidosEmPreparo,
                pedidosEntregues: results[0].pedidosEntregues,
                pedidosCancelados: results[0].pedidosCancelados
            });
        }
    )
}

module.exports = {
    dashboard,
}