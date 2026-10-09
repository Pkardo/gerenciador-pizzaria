const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.log('Erro ao conectar o banco')
        return;
    }

    console.log('Banco conectado com sucesso')
})

module.exports = connection;