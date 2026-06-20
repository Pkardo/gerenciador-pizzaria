const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kar030405&',
    database: 'gerenciador_pizzaria'
});

connection.connect((error) => {
    if (error) {
        console.log('Erro ao conectar o banco')
        return;
    }

    console.log('Banco conectado com sucesso')
})

module.exports = connection;