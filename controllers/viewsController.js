const express = require('express');
const { ArtPiece } = require('../models');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/home', async (req,res)=>{

    const allPieces = await ArtPiece.findAll({
        limit:12,
        order:sequelize.literal('updatedAt, DESC')
    })

    let passedInObject = {
        artPieces: allPieces.map(piece=>piece.get({plain:true}))
    }
    res.render('home', passedInObject)
})

router.get('/')

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/home')
    });
})

router.get('*', (req,res)=>{
    res.redirect('/home');
})

module.exports = router;