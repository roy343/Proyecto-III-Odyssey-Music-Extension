const mysql = require('mysql');

      /**
     * Se conecta a la base de datos
     * @param String host
     * @param String usuario
     * @param String Contrasena de mysql
     * @param String Nombre de la base de datos
     * 
     * @return String que confirma la conexion con la base de datos
     */
const mySQLConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'Odyssey'
});

mySQLConnection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Se ha conectado a la base de datos');
    }
});

module.exports = mySQLConnection;