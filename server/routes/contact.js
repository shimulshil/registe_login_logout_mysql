const express = require('express');
const connection = require('../connection');
const router =express.Router();

const bcrypt = require('bcrypt');   // For Hash Password

// Register New Data ------------------------------

router.post("/register",async (req, res)=>{
    const {name, email, password} =req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash (password, salt);
    const sqlInsert ="INSERT INTO user_db (name, email, password) VALUES(?, ?, ?)";
    connection.query('SELECT * from user_db WHERE name=? or email = ?', [name, email],(err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send({message:"1"})
                // res.send({message:"Email address already Exist!!"})  // If you want to send this message to the frontend
                return;
            }
                
                connection.query(sqlInsert, [name, email, hashedPassword], (error, result)=>{
                            console.log(error);
                            console.log(hashedPassword);
                            res.send({message:"2"})
                            // res.send({message:"User Added successfully!!"}) // If you want to send this message to the frontend

                            });
            }
        })
        
});

//Loging section -------------------

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query(
           "SELECT * FROM user_db WHERE email = ?;",
           [email], 
           (err, result)=> {
               if (err) {
                   res.send({err: err});
               }
               if (result.length > 0) {
                   bcrypt.compare(password, result[0].password, (error, response) => {
                       if (response) {
                           res.send(result);
                       } else{
                           res.send({message: "Wrong username/ password comination!"}); 
                       }
                   });
               } else {
                   res.send({ message: "User doesn't exists"});
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