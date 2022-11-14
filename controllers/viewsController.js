const express = require('express');
const { ArtPiece,Keyword,User,Comment, Like, Relationship, ArtPieceKeyword } = require('../models');
const router = express.Router();
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');


async function GetTopKeywords(){
    const apKeywords = await Keyword.findAll(
        {
            attributes:{
                include:[[Sequelize.fn("COUNT", Sequelize.col("ArtPieceId")), "Count"]]
            },
            include: [{
                model:ArtPiece
            }],
            group:['id'],
            order:[['Count', 'DESC']]
        }
    )

    const plainKeywords = apKeywords.map(x=>x.get({plain:true}));
    const top5 = plainKeywords.slice(0,5).map(x=>x.name);
    return top5;
}

router.get('/home', async (req,res)=>{

    try{
        const allPieces = await ArtPiece.findAll({
            include:[User,Keyword, Like],
            order:sequelize.literal('updatedAt DESC')
        });
        const plain = allPieces.map(x=>x.get({plain:true}))

        const top5 = await GetTopKeywords()
        
        const passedInObject = {
            title: 'Recent Creations',
            activeUser: req.session.activeUser,
            artPieces: plain,
            topKeywords: top5
        }
    
        res.render('home', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get('/artpiece/:id', async (req,res)=>{

    try{
        const artPiece = await ArtPiece.findOne({
            where:{id:req.params.id},
            include:[Keyword,User,{
                model:Comment,
                include:User
            },{
                model:Like
            }],
            
            });

            
        const top5 = await GetTopKeywords()
        const passedInObject = {
            activeUser: req.session.activeUser,
            artPiece: artPiece.get({plain:true}),
            isLiked: req.session.activeUser ? artPiece.Likes.some(like=>like.UserId==req.session.activeUser.id) : false,
            topKeywords: top5
        }
        
        console.log(passedInObject);
        return res.render('art-peice', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.get('/search', async(req,res)=>{
    try{
        let title = [];
        let keywordsWhere;
        if (req.query.keywords){
            const keywords = req.query.keywords.split(' ');
            keywordsWhere = {name:keywords}
            title.push("Searching: " + keywords)
        }

        let likedBy;
        if (req.query.likedby){
            const likedByUser = await User.findByPk(req.query.likedby);
            likedBy = {UserId: req.query.likedby}
            title.push("Liked By " + likedByUser.username)
        }

        let byUser;
        if (req.query.userid){
            const byUserData = await User.findByPk(req.query.userid);
            byUser = {id:req.query.userid}
            title.push(byUserData.username + "'s Gallery")
        }

        const options = {
            include:[
                {
                    model:User,
                    where:byUser
                },
                {
                    model:Like,
                    where:likedBy
                },
                {
                    model:Keyword,
                    where:keywordsWhere
            },Like],
            order:sequelize.literal('updatedAt DESC')
        }

        const allPieces = await ArtPiece.findAll(options);
        const plain = allPieces.map(piece=>piece.get({plain:true}))
        plain.forEach(piece=>{ piece.isLiked = req.session.activeUser ? piece.Likes.some(like=>like.UserId==req.session.activeUser.id) : false})
        // Silvia- search no result
        let passedInObject;
        if(plain.length === 0){
            passedInObject = {
                title:"Nothing found, try another keyword"
            }
        } else { passedInObject = {
            title:title,
            activeUser: req.session.activeUser,
            artPieces: plain
        } }

        const top5 = await GetTopKeywords();
        passedInObject.topKeywords = top5;

        passedInObject.showWatchButton = byUser != undefined;
        passedInObject.galleryId = byUser ? byUser.id : null;

        if (req.session.activeUser && byUser != undefined){
            const isFollowing = await Relationship.findOne({where:{
                UserId: req.session.activeUser.id,
                FollowingId: req.query.userid
            }});
            console.log("------------------")
            console.log(isFollowing);

            passedInObject.isWatching = isFollowing != null;
        }

        res.render('home', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get('/dashboard', async(req,res)=>{
    if (req.session.activeUser){
        const user = await User.findByPk(req.session.activeUser.id, {
            include:[
                ArtPiece, 
                Like, 
                Relationship]
        });

        console.log(user);
        console.log('---------------------------')
        const myPieces = await ArtPiece.findAll({
            where:{UserId:req.session.activeUser.id},
            include:[User,Keyword, Like],
            order:sequelize.literal('updatedAt DESC')
        })
        const myFollowing = await Relationship.findAll({
            where: {
                UserId:req.session.activeUser.id
            },
            include:[{
                model:User,
                as: 'Following',
                attributes:{
                    exclude:'password'
                }
            }],
            attributes:{
                exclude:['id', 'UserId']
            }
        })
        
        console.log(myFollowing);

        const myWatchers = await Relationship.findAll({
            where:{
                FollowingId:req.session.activeUser.id
            },
            include:{
                model:User,
                as: 'Follower',
                attributes:{
                    exclude:'password'
                }
            },
            attributes:{
                exclude:['id']
            }
        })
        console.log(myWatchers);

        const myFollowingPlain = myFollowing.map(rel=>{return rel.get({plain:true})});
        const myWatchersPlain = myWatchers.map(rel=>{return rel.get({plain:true})});
        console.log(myWatchersPlain);

        const passedInObject = {
            activeUser: req.session.activeUser,
            artPieces: myPieces.map(piece=>piece.get({plain:true})),
            following: myFollowingPlain.map(rel=>rel.Following),
            followers: myWatchersPlain.map(rel=>rel.Follower)
        }

        const top5 = await GetTopKeywords();
        passedInObject.topKeywords = top5;

        return res.render('dashboard', passedInObject);
    }else{
        return res.redirect('/signin')
    }
})

router.get('/gallery/:id', async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);

        if (!user){
            return res.redirect('/home');
        }
        const allPieces = await ArtPiece.findAll({
            where:{UserId:req.params.id},
            include:[User,Keyword, Like],
            order:sequelize.literal('updatedAt DESC')
        });
        const passedInObject = {
            activeUser: req.session.activeUser,
            artPieces: allPieces.map(piece=>piece.get({plain:true})),
            galleryOwner: user.get({plain:true})
        }
    
        res.render('gallery', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.get('/signin',async (req,res)=>{
    const top5 = await GetTopKeywords();

    res.render('signin',{
        topKeywords:top5
    });
})

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/home')
    });
})

router.get('/addartpiece',async (req,res)=>{
    if (!req.session.activeUser){

    }
    const passedInObject = {
        activeUser: req.session.activeUser
    }
    passedInObject.topKeywords = await GetTopKeywords();
    res.render('add-artpiece', passedInObject)
})
router.get('/edit/:id',async(req,res)=>{
    if (!req.session.activeUser){
        return res.redirect('/signin')
    }

    const artPiece = await ArtPiece.findByPk(req.params.id, {
        include:Keyword
    });
    if (artPiece.UserId != req.session.activeUser.id){
        return res.redirect('/signin')
    }
    const passedInObject = {
        activeUser: req.session.activeUser,
        artPiece: artPiece.get({plain:true}),
        keywords: artPiece.Keywords.map(keyword=> keyword.name).join(' ')
    }
    passedInObject.topKeywords = await GetTopKeywords();

    res.render('update-art', passedInObject)
})

router.get('/')

router.get('*', (req,res)=>{
    res.redirect('/home');
})


module.exports = router;
