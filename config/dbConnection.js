var mysql = require('mysql');

var connMySQL = function() {
    console.log('conexao com bd foi estabelecida');
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'portal_noticias',
    
    });
}

module.exports = function () {
    return connMySQL;
}