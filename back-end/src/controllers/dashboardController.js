const connection = require('../config/database');

function dashboard(req, res) {
    const { inicio, fim } = req.query;
    connection.query(`
        SELECT COUNT(*) AS totalPedidos,
        COALESCE(SUM(valor_total), 0) AS faturamentoTotal,
        COALESCE(SUM(CASE
                WHEN status_pedido = 'em_preparo'
                THEN 1
                ELSE 0
            END), 0) AS pedidosEmPreparo,

            COALESCE(SUM(CASE
                WHEN status_pedido = 'entregue'
                THEN 1
                ELSE 0
            END), 0) AS pedidosEntregues,

            COALESCE (SUM(CASE
                WHEN status_pedido = 'cancelado'
                THEN 1
                ELSE 0
            END), 0) AS pedidosCancelados

        FROM pedidos WHERE criado_em >= ? AND criado_em  < DATE_ADD(?, interval 1 DAY)`, [inicio, fim],

        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: "Erro ao buscar Total de pedidos",
                    erro: error.message,
                    code: error.code
                });
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