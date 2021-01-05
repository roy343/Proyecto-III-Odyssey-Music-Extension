const express = require('express');
const router = express.Router();
const mySQLConnection = require('../db')


router.get('/', (req,res)=>{
    mySQLConnection.query('SELECT * FROM persona',(err,rows,flieds) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
})

module.exports = router;