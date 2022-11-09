const express = require('express');
const { ArtPiece,Keyword,User } = require('../models');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/home', async (req,res)=>{

    const allPieces = await ArtPiece.findAll();

    let passedInObject = {
        activeUser: req.session.activeUser,
        artPieces: allPieces.map(piece=>piece.get({plain:true}))
    }
    res.render('home', passedInObject)
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/home')
    });
})

router.get('/')

router.get('*', (req,res)=>{
    res.redirect('/home');
})

module.exports = router;
