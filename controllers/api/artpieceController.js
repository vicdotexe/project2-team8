const express = require('express');
const { ArtPiece, Keyword, User} = require('../../models');
const router = express.Router();
const sequalize = require('sequelize');

router.get("/", async(req,res)=>{
    try{
        const artPieces = await ArtPiece.findAll({
            include:[Keyword,User],
            order:sequalize.literal('updatedAt DESC')
            });
        const artPiecesPlain = artPieces.map(piece => piece.get({plain:true}));
        return res.json(artPiecesPlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get("/:id", async(req,res)=>{
    try{
        const artPiece = await ArtPiece.findOne({
            where:{id:req.params.id},
            include:[Keyword,User],
            });
        const artPiecePlain = artPiece.get({plain:true});
        return res.json(artPiece);
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

router.delete("/:id", async (req, res) => {
    try {
        const deleteArtpieces = await ArtPiece.destroy({
            where: {
              id: req.params.id,
            },
        });
        if (!deleteArtpieces) {
          res.status(404).json({ message: 'No art with this id!' });
          return;
        }
        res.status(200).json(deleteArtpieces);
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;