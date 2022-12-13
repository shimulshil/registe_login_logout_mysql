const express = require('express');
const connection = require('../connection');
const router =express.Router();

// Register New Data ------------------------------

router.post("/register", (req, res)=>{
    const {name, email, password} =req.body;
    const sqlInsert ="INSERT INTO user_db (name, email, password) VALUES(?, ?, ?)";
    connection.query('SELECT * from user_db WHERE name=? or email = ?', [name, email],(err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                //res.send({message:"Email address already Exist!!"})
                res.send({message:"1"})
                return;
            }
                
                connection.query(sqlInsert, [name, email, password], (error, result)=>{
                            console.log(error);
                            //res.send({message:"User Added successfully!!"})
                            res.send({message:"2"})
                            });
            }
        })
        
});


//Loging -------------------

router.post("/login", (req, res)=>{
    const email =req.body.email;
    const password =req.body.password;
    connection.query("SELECT * FROM user_db WHERE email=? AND password = ?", 
    [email, password],
     (err, result) => {
        if (err) {
            res.send({err:err});
        } 
        if(result.length >0){
            res.send(result);
        }
        else {
            res.send({message:"WrongEmail & Password. Try Again!! "});
                }
            }
            );
});

// Gell All Data --------------------------------------------

router.get("/get", (req, res)=>{
    const sqlGet = "SELECT * FROM user_db";
    connection.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});
 
module.exports = router;