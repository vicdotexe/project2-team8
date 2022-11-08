const sequelize = require("../config/connection");
const {User,ArtPiece,Comment,Genre,Keyword} = require("../models/");
const CartItem = require("../models/CartItem");
const {User,Comment,Keyword, ArtPiece} = require("../models/");

const seed = async ()=> {
    await sequelize.sync({force:true});

    const users = await User.bulkCreate([
        {
            username:"silvia",
            password:"passwords"
        },
        {
            username:"eileen",
            password:"passworde"
        },
        {
            username:"sean",
            password:"password"
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
            name:"Starry Night",
            path:"https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg?t=1660737943&",
            UserId: 1
        },
        {
            name:"Random",
            path:"https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/random-maria-aqull.jpg",
            UserId: 2
        },
        {
            name:"Mona Lisa",
            path:"https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-1.jpg?t=1660737943&",
            UserId: 3
        },
        {
            name:"Girl With A Pearl Earring",
            path:"https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-8.jpg?t=1660737943&",
            UserId: 4
        },
        {
            name:"Tibet Girl",
            path:"https://3.bp.blogspot.com/-DH3wEUMiAME/U4M9oVNgaaI/AAAAAAABPxw/qhI7UUxyTWU/s1600/tibet-girls-Ai-Xuan-fine-art-and-you4.jpg",
            UserId: 5
        },
        {
            name:"The Birth of Venus",
            path:"https:https://cdn.shopify.com/s/files/1/0047/4231/6066/files/The_Birth_of_Venus_by_Sandro_Botticelli_800x.jpg",
            UserId: 6
        },
        {
            name:"Rain at the Park", 
            path: "https://cdn.shopify.com/s/files/1/0591/9784/9807/products/rain-at-the-park-advanced-cities-famous-paintings-paint-by-numbers-global-figuredart-free-shipping_110_530x@2x.jpg?v=1630485132", 
            UserId: 7
        },
        {
            name:"L'AMITIE", 
            path: "https://media.overstockart.com/optimized/cache/data/product_images/PS56920X24-1000x1000.jpg", 
            UserId: 8
        },
        {
            name:"", 
            path: "", 
            UserId: 9
        },
        {
            name:"", 
            path: "", 
            UserId: 10
        },
        {
            name:"", 
            path: "", 
            UserId: 11
        },
        {
            name:"", 
            path: "", 
            UserId: 12
        },
        {
            name:"", 
            path: "", 
            UserId: 13
        },
        {
            name:"", 
            path: "", 
            UserId: 14
        },
        {
            name:"", 
            path: "", 
            UserId: 15
        },
        {
            name:"", 
            path: "", 
            UserId: 16
        },
        {
            name:"", 
            path: "", 
            UserId: 17
        },
        {
            name:"", 
            path: "", 
            UserId: 18
        },
        {
            name:"", 
            path: "", 
            UserId: 19
        },
        {
            name:"", 
            path: "", 
            UserId: 20
        },
    ])


    
    artPeices.forEach(async(artPeice)=>{
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

    await users[0].addToCartAsync(artPeices[0].id);
    await users[0].addToCartAsync(artPeices[1].id);

    const item = await CartItem.findOne({where:{ArtPeiceId:1}});
    await item.remove();

    console.log("seeded!")
    process.exit(0)
}

seed();