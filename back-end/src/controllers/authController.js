const bcrypt = require('bcrypt');
const connection = require('../config/database');
const jwt = require('jsonwebtoken');


function login(req, res) {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({
            mensagem: "Login e senha são obrigatorios!"
        })
    }

    connection.query(
        `SELECT * FROM usuarios WHERE login = ?`, [login],
        (error, results) => {

            if (error) {
                console.log(error)

                return res.status(500).json({
                    mensagem: "Erro ao procurar Usuario",
                    erro: error.message,
                    code: error.code
                })
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Usuario não encontrado",
                })
            }

            const usuario = results[0];
            const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: "Senha Incorreta!"
                })
            }

            const token = jwt.sign({
                id: usuario.id,
                login: usuario.login,
                tipo: usuario.tipo
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            return res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                token: token
            })
        }
    )
}

module.exports = {
    login
}