const express = require('express');
const router = express.Router();
const mySQLConnection = require('../db')



// Rutas para los usuarios

//Ruta para obtener todos los usuarios
router.get('/users', (req,res)=>{
    mySQLConnection.query('SELECT * FROM Users',(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

// Ruta para obtener un usuario con su ID
router.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE Userid = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
});

// Ruta para comprobar que un usuario existe usando su id
router.get('/users/exists/:id', (req, res)=>{
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE Userid = ?', [id], (err, rows, fields)=>{
        if(rows != []){
            console.log(rows);
            res.json(rows);
        } else{
            res.json('True');
        }
    })
});

// Ruta para comprobar que un usuario existe usando su correo
router.get('/checkmail/:mail', (req, res)=>{
    const { mail } = req.params;
    mySQLConnection.query('SELECT * FROM Users WHERE UserEmail = ?', [mail], (err, rows, fields)=>{
        if(rows = []){
            res.json(rows);
            console.log(mail);
        } else{
            res.json('True');
        }
    })
});



// Ruta para crear un usuario
router.post('/users', (req,res)=>{
    const {id, name, mail, role} = req.body;
    const queryPost = `
    CALL createUser (?, ?, ?, ?);
    `;
    mySQLConnection.query(queryPost, [id,name,mail,role], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Persona agregada'});
        } else{
            console.log(err);
        }

    })
});


// Ruta para borrar un usuario por su ID
router.delete('/users/:id', (req,res)=>{
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM Users WHERE Userid = ?',[id],(err, rows, fields)=>{
        if(!err){
            res.json({status: 'User deleted'});
        } else {
            console.log(err);
        }
    })
})


//Rutas para las canciones


// Rut para obtener las canciones

router.get('/songs', (req,res)=>{
    const queryGetAll = `
        Call GetAll();
    `;
    mySQLConnection.query(queryGetAll,(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

//Ruta para borrar una cancion por su ID

router.delete('/songs/:id', (req,res)=>{
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM MusicData WHERE trackid = ?',[id],(err, rows, fields)=>{
        if(!err){
            res.json({status: 'User deleted'});
        } else {
            console.log(err);
        }
    })
})

// Ruta para buscar una cancion

router.get('/songs/:dato', (req, res)=>{
    const { dato } = req.params;
        const querySearch = `
        Call GetCancion (?);
    `;
    mySQLConnection.query(querySearch, [dato], (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }

    })
});
module.exports = router;