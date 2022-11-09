const express = require('express');
const router = express.Router();

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

router.post('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be logged in to comment."})
    }
    try{
        const newcommentData = await Comment.create({
            content:req.body.content,
            UserId: req.session.activeUser.id,
            ArtPieceId: req.params.id
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