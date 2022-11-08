const express = require('express');
const { ArtPiece, Keyword } = require('../../models');
const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const artPieces = await ArtPiece.findAll();
        const artPiecesPlain = artPieces.map(piece => piece.get({plain:true}));
        return res.json(artPieces);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get("/:id", async(req,res)=>{
    try{
        const artPiece = await ArtPiece.findOne({where:{id:req.params.id},include:{model:Keyword}});
        const artPiecePlain = artPiece.get({plain:true});
        return res.json(artPiecePlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.post("/", async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"must be logged in to add an image"})
    }
    req.body.UserId = req.session.activeUser.id;
    try{
        const newPiece = await ArtPiece.create(req.body);
        if (req.body.keywords){
            await newPiece.addKeywordsAsync(req.body.keywords)
        }
        return res.status(201).json(newPiece);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.put("/:id", async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"must be logged in to add an image"})
    }
    req.body.UserId = req.session.activeUser.id;
    const isMine = await ArtPiece.findOne({where:{id:req.params.id, UserId:req.session.activeUser.id}})
    if (!isMine){
        return res.status(401).json({message:"that's not your piece"})
    }
    try{
        const updated = await ArtPiece.update(req.body, {where:{id:isMine.id}});
        if (req.body.keywords){
            await isMine.resetKeywordsAsync(req.body.keywords)
        }
        return res.status(201).json(updated);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

module.exports = router;