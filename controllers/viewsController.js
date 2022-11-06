const express = require('express');
const router = express.Router();

router.get('/home', (req,res)=>{
    res.render('home', {partialData: {message:"hi"}})
})

router.get('*', (req,res)=>{
    res.redirect('/home');
})

module.exports = router;