const express = require('express');
const { User } = require('../../models');
const router = express.Router();
const bcrypt = require("bcrypt")

router.get("/", async(req,res)=>{
    try{
        const users = await User.findAll();
        const usersPlain = users.map(user => user.get({plain:true}));
        return res.json(usersPlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        const userPlain = user.get({plain:true});
        return res.json(userPlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.post('/', async(req,res)=>{
    try{
        const newUserData = await User.create(req.body);
        req.session.activeUser = {
            username:req.body.username,
            id: newUserData.id
        }
        res.status(201).json(newUserData);
    }catch(err){
        res.status(500).json({message:"That username is taken."})
    }
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({where:{username:req.body.username}});
    if (!user){
        return res.status(401).json({message:"Invalid Credentials."});
    }
    if (!user.isPasswordValid(req.body.password)){
        return res.status(401).json({message:"Invalid Credentials."});
    }
    req.session.activeUser = {
        username: req.body.username,
        id: user.id
    }
    return res.json({message:"logged in"})
})

module.exports = router;