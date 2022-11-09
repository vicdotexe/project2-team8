const express = require('express');
const router = express.Router();
const {Comment} = require('../../models')

router.get('/', async(req,res)=>{
    try{
        const commentData = await Comment.findAll();
        res.json(commentData);
    }catch(err){
        res.json({message:err.message})
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const commentsData = await Comment.findByPk(req.params.id);
        res.json(commentsData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.post('/', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be logged in to comment."})
    }
    // if (!req.body.content || ! req.body.artId){
    //     return res.status(401).json({message:"Must have content and associated artId"})
    // }
    try{
        const newcommentData = await Comment.create({
            content:req.body.content,
            UserId: req.session.activeUser.id,
            ArtPieceId: req.body.artId
        });
        res.json(newcommentData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const delData = await Comment.destroy({where:{id:req.params.id}})
        res.json(delData)
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router;