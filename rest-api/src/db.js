const mysql = require('mysql');

const mySQLConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Spark117Roy343',
    database: 'test'
});

mySQLConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    } else{
        console.log('Db is connected');
    }
});

module.exports = mySQLConnection;