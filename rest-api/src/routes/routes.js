const express = require('express');
const router = express.Router();
const mySQLConnection = require('../db')



// Rutas para los usuarios
router.get('/users', (req,res)=>{
    mySQLConnection.query('SELECT * FROM persona',(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

router.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM persona WHERE id = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
            console.log(id);
        }
    })
});

router.get('/users/exists/:id', (req, res)=>{
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM persona WHERE id = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json('True');
        } else{
            res.json('False');
        }
    })
});

router.post('/users', (req,res)=>{
    const {id, name} = req.body;
    const queryPost = `
        CALL personaAddOrEdit(?, ?);
    `;
    mySQLConnection.query(queryPost, [id,name], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Persona agregada'});
        } else{
            console.log(err);
        }

    })
});

router.delete('/users/:id', (req,res)=>{
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM persona WHERE id = ?',[id],(err, rows, fields)=>{
        if(!err){
            res.json({status: 'User deleted'});
        } else {
            console.log(err);
        }
    })
})


//Rutas para las canciones

// router.get('/songs', (req,res)=>{
//     const queryGetAll = `
//         Call GetAll();
//     `;
//     mySQLConnection.query(queryGetAll,(err,rows,flieds) =>{
//         if(!err){
//             res.json(rows);
//         } else{
//             console.log(err);
//         }
//     })
// })

router.get('/songs', (req,res)=>{
    mySQLConnection.query('SELECT * FROM cancion',(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

router.delete('/songs/:id', (req,res)=>{
    const { id } = req.params;
    mySQLConnection.query('DELETE FROM cancion WHERE id = ?',[id],(err, rows, fields)=>{
        if(!err){
            res.json({status: 'User deleted'});
        } else {
            console.log(err);
        }
    })
})


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