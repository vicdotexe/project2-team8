const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        //wrong username
        if(!foundUser){
            return res.status(401).json({msg:"Invalid login credentials"})
        } 
        //wrong password
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"Invalid login credentials"})
        }
        //correct login
        req.session.userInfo = {
            username:foundUser.username,
            id:foundUser.id
        }
        res.json(foundUser);
    })
})
module.exports = router;