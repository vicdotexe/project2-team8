const sequelize = require("../config/connection");
const {User,ArtPiece,Comment,Genre,Keyword} = require("../models/");
const CartItem = require("../models/CartItem");
// const {User,Comment,Keyword, ArtPiece} = require("../models/");

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
            name:"Poppies in a Field", 
            path: "https://www.biographyonline.net/wp-content/uploads/2014/05/Claude_Monet_-_Poppy_Field.jpg.webp", 
            UserId: 9
        },
        {
            name:"Guardian Angel", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/guardian-angel-roy-pedersen.jpg", 
            UserId: 10
        },
        {
            name:"French Theater Square", 
            path: "https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMjI0LXBkcGlzc2Fycm8wMDI3My1pbWFnZS5qcGc.jpg", 
            UserId: 11
        },
        {
            name:"Rich Port", 
            path: "https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGRmbWE0LXBkcGF1bGtsZWUwMDAyMC1pbWFnZS5qcGc.jpg", 
            UserId: 12
        },
        {
            name:"Bridge to Eternity", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/bridge-to-eternity-michael-lang.jpg", 
            UserId: 13
        },
        {
            name:"Nature Walk In Ridgefield Washington", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/nature-walk-ridgefield-washington-jim-gola.jpg", 
            UserId: 14
        },
        {
            name:"Alone Now", 
            path: "https://images.fineartamerica.com/images-medium-large-5/original-landscape-art-birds-painting--alone-now-amy-giacomelli.jpg", 
            UserId: 15
        },
        {
            name:"The Persistence of Memory", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-persistence-of-memory-the-famous-painting-2.jpeg?resize=566%2C430&ssl=1", 
            UserId: 16
        },
        {
            name:"No. 5, 1948", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/no-5-1948-2.jpeg?resize=519%2C292&ssl=1", 
            UserId: 17
        },
        {
            name:"A Sunday Afternoon on the Island of La Grande Jatte", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/a-sunday-afternoon-on-the-island-of-la-grande-jatt-2.jpeg?resize=596%2C397&ssl=1", 
            UserId: 18
        },
        {
            name:"The Triumph of Galatea", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-triumph-of-galatea-1.jpeg?resize=508%2C682&ssl=1", 
            UserId: 19
        },
        {
            name:"Dogs Playing Poker", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/dogs-playing-poker-2.jpeg?resize=603%2C361&ssl=1", 
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


    console.log("seeded!")
    process.exit(0)
}

seed();
