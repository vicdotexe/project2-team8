const express = require('express');
const router = express.Router();

router.get('/home', (req,res)=>{
    let passedInObject = {
        
    }
    res.render('home', passedInObject)
})


router.get('*', (req,res)=>{
    res.redirect('/home');
})

module.exports = router;