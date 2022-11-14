const express = require('express');
const { Relationship } = require('../../models');
const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const relationships = await Relationship.findAll();
        const relationshipsPlain = relationships.map(relationship => relationship.get({plain:true}));
        return res.json(relationshipsPlain);
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

router.post('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be signed in"})
    }
    try{
        const relationshipData = await Relationship.findOrCreate({where:{
            UserId: req.session.activeUser.id,
            FollowingId: req.params.id
        }});
        res.status(201).json(relationshipData);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})

router.put('/toggle/:id',async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be signed in"})
    }
    try{
        const relationshipData = await Relationship.findOrCreate({where:{
            UserId: req.session.activeUser.id,
            FollowingId: req.params.id
        }});
        if (!relationshipData[1]){
            const deleteData = await Relationship.destroy({where:{
                UserId: req.session.activeUser.id,
                FollowingId: req.params.id
            }});
        }

        res.status(200).json(relationshipData[1]);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"Must be signed in"})
    }
    try{
        const likeData = await Relationship.destroy({where:{
            FollowerId: req.session.activeUser.id,
            FollowedId: req.params.id
        }});
        res.status(201).json(likeData);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})

module.exports = router;