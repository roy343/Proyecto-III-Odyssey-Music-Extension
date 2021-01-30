const express = require('express');
const router = express.Router();
const mySQLConnection = require('../db')


// Rutas para los usuarios

/**
 * Obtiene todos los usuarios registrados
 * 
 * @return Una lista con todos los usuarios registrados en la base de datos
 */

router.get('/users', (req, res) => {
    mySQLConnection.query('SELECT * FROM Users', (err, rows, flieds) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

/**
 * Obtiene un usuario usando el id
 * @param int id del usuario
 * @return Retorna todos los datos del usuario
 */

// Ruta para obtener un usuario con su ID
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE Userid = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

/**
 * Comprueba si el usuario existe usando la id del usuario
 * @param int id del usuario 
 * @return Obejto JSON 
 */

// Ruta para comprobar que un usuario existe usando su id
router.get('/users/exists/:id', (req, res) => {
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE Userid = ?', [id], (err, rows, fields) => {
        if (rows != []) {
            console.log(rows);
            res.json(rows);
        } else {
            res.json('True');
        }
    })
});

/**
 * Comprueba si el usuario existe usando el correo del usuario
 * @param String correo del usuario que se desea buscar
 * @return Obejto JSON 
 */

router.get('/checkmail/:id', (req, res) => {
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE UserEmail = ?', [id], (err, rows, fields) => {
        res.json(rows);
    })
});


/**
 * Comprueba si el usuario existe
 * @param int id del usuario 
 * @param String nombre del usuario
 * @param String correo del usuario
 * @param String rol del usuario
 * 
 * @return Obejeto JSON 
 */

router.post('/users', (req, res) => {
    const { id, name, mail, role } = req.body;
    const queryPost = `
    CALL createUser (?, ?, ?, ?);
    `;
    mySQLConnection.query(queryPost, [id, name, mail, role], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Persona agregada' });
        } else {
            console.log(err);
        }

    })
});

/**
 * Borra a un usuario usando el id
 * @param int id del usuario que se desea borrar
 * 
 * @return Mensaje de verificacion de que se borro el usuario
 */



router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM Users WHERE Userid = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User deleted' });
        } else {
            console.log(err);
        }
    })
})


//Rutas para las canciones


/**
 * Ruta para obtener todas las canciones en la base de datos
 * 
 * @return Objeto JSON con todas las canciones almacenadas en la base de datos
 */

router.get('/songs', (req, res) => {
    const queryGetAll = `
        Call GetAll();
    `;
    mySQLConnection.query(queryGetAll, (err, rows, flieds) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

/**
 * Borra a una cancion usando el id
 * @param int id de la cancion que se necesite borrar 
 * 
 * @return Mensaje de verificacion de que se borro el usuario
 */

router.delete('/songs/:id', (req, res) => {
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM MusicData WHERE trackid = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User deleted' });
        } else {
            console.log(err);
        }
    })
})

/**
 * Busca una cancion en la base de datos 
 * @param String datos que se quiera realizar para hacer la busqueda  
 * 
 * @return Todos los resultados que coincidan con los datos
 */

router.get('/songs/:dato', (req, res) => {
    const { dato } = req.params;
    const querySearch = `
        Call GetCancion (?);
    `;
    mySQLConnection.query(querySearch, [dato], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});

/**
 * Agrega las canciones a la base de datos
 */
router.post('/songs/', (req, res) => {
    const { trackid, nombre_cancion, nombre_artista, nombre_album } = req.body;
    console.log(req.body);
    const query = `
        CALL AddSong(?, ?, ?, ?);
    `;
    mySQLConnection.query(query, [trackid, nombre_cancion, nombre_artista, nombre_album], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Song Added' });
        } else {
            console.log(err);
        }
    });
});
module.exports = router;