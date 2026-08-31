const bcrypt = require('bcrypt');
const connection = require('../config/database');

function criarUsuario(req, res) {
    const { login, senha, tipo } = req.body;

    if (!login || !senha) {
        return res.status(400).json({
            mensagem: "Login e senha são obrigatorios!"
        })
    }

    const senhaHash = bcrypt.hashSync(senha, 10);

    connection.query('INSERT INTO usuarios (login, senha, tipo) VALUES (?, ?, ?)', [login, senhaHash, 'funcionario'],
        (error, results) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensagem: 'Erro ao criar usuário',
                    erro: error.message,
                    code: error.code
                })
            } 

            res.status(201).json({
                mensagem: 'Usuário criado com sucesso!'
            })
        }

    )
}

module.exports = {
    criarUsuario
}