const mysql = require('mysql');

const mySQLConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'Odyssey'
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