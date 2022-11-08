const sequelize = require("../config/connection");
const {User,ArtPeice,Comment,Genre,Keyword} = require("../models/");
const CartItem = require("../models/CartItem");

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

    const artPeices = await ArtPeice.bulkCreate([
        {
            name:"art name 1",
            path:"https://www.website.com/image.png",
            UserId: 1
        },
        {
            name:"art name 2",
            path:"https://www.website.com/image.png",
            UserId: 2
        },
    ])

    
    artPeices.forEach(async(artPeice)=>{
        //randomly pull 3-5 words from a master-list of possible keywords
        const keywordArray = [];
        await artPeice.addKeywordsAsync(keywordArray);
    })

    const comments = await Comment.bulkCreate([
        {
            content:"cool art",
            ArtPeiceId: 1,
            UserId: 1
        },
        {
            content:"i like it",
            ArtPeiceId: 2,
            UserId: 2
        },
        {
            content:"very nice",
            ArtPeiceId: 1,
            UserId: 3
        }
    ])

    await users[0].addToCartAsync(artPeices[0].id);
    await users[0].addToCartAsync(artPeices[1].id);

    const item = await CartItem.findOne({where:{ArtPeiceId:1}});
    await item.remove();

    console.log("seeded!")
    process.exit(0)
}

seed();