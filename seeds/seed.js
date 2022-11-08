const sequelize = require("../config/connection");
const {User,Comment,Keyword, ArtPiece} = require("../models/");

const seed = async ()=> {
    await sequelize.sync({force:true});

    const users = await User.bulkCreate([
        {
            username:"silvia",
            password:"passwords"
        },
        {
            username:"eiline",
            password:"passworde"
        },
        {
            username:"sean",
            password:"passwords"
        },
        {
            username:"victor",
            password:"passwordv"
        },

    ],{
        individualHooks:true
    })

    const artPieces = await ArtPiece.bulkCreate([
        {
            name:"art name 1",
            path:"https://www.website.com/image.png",
            UserId: 1,
            genre:"Photography",
            description:"this is a photo of a tree"
        },
        {
            name:"art name 2",
            path:"https://www.website.com/image.png",
            UserId: 2,
            genre:"Digital",
            description:"this is an abstract image"
        },
    ])

    
    // this isn't neccessary, you can bulk create them individually if you want
    artPieces.forEach(async(artPiece)=>{
        //randomly pull 3-5 words from a master-list of possible keywords
        const keywordArray = [];
        await artPiece.addKeywordsAsync(keywordArray);
    })

    const comments = await Comment.bulkCreate([
        {
            content:"cool art",
            ArtPieceId: 1,
            UserId: 1
        },
        {
            content:"i like it",
            ArtPieceId: 2,
            UserId: 2
        },
        {
            content:"very nice",
            ArtPieceId: 1,
            UserId: 3
        }
    ])

    console.log("seeded!")
    process.exit(0)
}

seed();