const express = require('express');
const router = express.Router();
const mySQLConnection = require('../db')


router.get('/users', (req,res)=>{
    mySQLConnection.query('SELECT * FROM cancion',(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    mySQLConnection.query('SELECT * FROM persona WHERE id = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
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

module.exports = router;