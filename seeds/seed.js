const sequelize = require("../config/connection");
const {User,ArtPiece,Comment, Relationship, Like} = require("../models/");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

// lorem for generating random descriptions and comments
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const seed = async ()=> {
    await sequelize.sync({force:true});

    // Bulk create Users
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

    // Bulk create Relations
    const bulkRelations = [];
    for (let i = 1; i <= users.length; i++){
        for (let j = 1; j <= users.length; j ++){
            if (i != j){
                let rand = Math.floor(Math.random()*2);
                if (rand){
                    bulkRelations.push({
                        UserId:i,
                        FollowingId:j
                    })
                }
            }
        }
    }
    const relations = await Relationship.bulkCreate(bulkRelations);

    // Construct hardcoded artpiece data
    const bulkArtPieces = [
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
            UserId: 1
        },
        {
            name:"The Birth of Venus",
            path:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/640px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
            UserId: 2
        },
        {
            name:"Rain at the Park", 
            path: "https://cdn.shopify.com/s/files/1/0591/9784/9807/products/rain-at-the-park-advanced-cities-famous-paintings-paint-by-numbers-global-figuredart-free-shipping_110_530x@2x.jpg?v=1630485132", 
            UserId: 3
        },
        {
            name:"L'AMITIE", 
            path: "https://media.overstockart.com/optimized/cache/data/product_images/PS56920X24-1000x1000.jpg", 
            UserId: 4
        },
        {
            name:"Poppies in a Field", 
            path: "https://www.biographyonline.net/wp-content/uploads/2014/05/Claude_Monet_-_Poppy_Field.jpg.webp", 
            UserId: 1
        },
        {
            name:"Guardian Angel", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/guardian-angel-roy-pedersen.jpg", 
            UserId: 2
        },
        {
            name:"French Theater Square", 
            path: "https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMjI0LXBkcGlzc2Fycm8wMDI3My1pbWFnZS5qcGc.jpg", 
            UserId: 3
        },
        {
            name:"Rich Port", 
            path: "https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGRmbWE0LXBkcGF1bGtsZWUwMDAyMC1pbWFnZS5qcGc.jpg", 
            UserId: 4
        },
        {
            name:"Bridge to Eternity", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/bridge-to-eternity-michael-lang.jpg", 
            UserId: 1
        },
        {
            name:"Nature Walk In Ridgefield Washington", 
            path: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/nature-walk-ridgefield-washington-jim-gola.jpg", 
            UserId: 2
        },
        {
            name:"Alone Now", 
            path: "https://images.fineartamerica.com/images-medium-large-5/original-landscape-art-birds-painting--alone-now-amy-giacomelli.jpg", 
            UserId: 3
        },
        {
            name:"The Persistence of Memory", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-persistence-of-memory-the-famous-painting-2.jpeg?resize=566%2C430&ssl=1", 
            UserId: 4
        },
        {
            name:"No. 5, 1948", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/no-5-1948-2.jpeg?resize=519%2C292&ssl=1", 
            UserId: 1
        },
        {
            name:"A Sunday Afternoon on the Island of La Grande Jatte", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/a-sunday-afternoon-on-the-island-of-la-grande-jatt-2.jpeg?resize=596%2C397&ssl=1", 
            UserId: 2
        },
        {
            name:"The Triumph of Galatea", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-triumph-of-galatea-1.jpeg?resize=508%2C682&ssl=1", 
            UserId: 3
        },
        {
            name:"Dogs Playing Poker", 
            path: "https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/dogs-playing-poker-2.jpeg?resize=603%2C361&ssl=1", 
            UserId: 4
        },
    ]
    // Generate random description for each piece
    bulkArtPieces.forEach(piece=> piece.description = lorem.generateParagraphs(1));

    // Bulk create ArtPieces
    const artPieces = await ArtPiece.bulkCreate(bulkArtPieces)

// title names adding to the keywords
    await artPieces[1].addKeywordsAsync(["lanscape", "starry night", "houses"])
    await artPieces[2].addKeywordsAsync(["abstract", "colorful", "shapes", "random"])
    await artPieces[3].addKeywordsAsync(["women", "smile", "portrait", "mona lisa"])
    await artPieces[4].addKeywordsAsync(["women", "portrait", "earring", "Girl with a pearl earring"])
    await artPieces[5].addKeywordsAsync(["women", "sleep", "warm", "Tibet girl" ])
    await artPieces[6].addKeywordsAsync(["women", "seashell", "hair", "trees", "the birth of venus"])
    await artPieces[7].addKeywordsAsync(["lanscape", "trees", "trail", "rain at the park"])
    await artPieces[8].addKeywordsAsync(["abstract", "red", "faces", "L'amitie"])
    await artPieces[9].addKeywordsAsync(["lanscape", "women", "flower", "trees", "poppies in a field"])
    await artPieces[10].addKeywordsAsync(["angels", "children", "flower", "guardian Angel"])
    await artPieces[11].addKeywordsAsync(["buildings", "street", "landscape", "carriage", "French theater square"])
    await artPieces[12].addKeywordsAsync(["lines", "abstract", "shapes", "rich port"])
    await artPieces[13].addKeywordsAsync(["abstract", "colorful", "bridge", "bridge to eternity"])
    await artPieces[14].addKeywordsAsync(["lanscape", "trees", "nature", "nature walk in Ridgefield Washington"])
    await artPieces[15].addKeywordsAsync(["lanscape", "birds", "lake", "evening", "alone now"])
    await artPieces[16].addKeywordsAsync(["time", "clock", "brown", "The persistence of memory"])
    await artPieces[17].addKeywordsAsync(["abstract", "lines", "yellow", "no 5, 1948"])
    await artPieces[18].addKeywordsAsync(["waterfront", "park", "women", "grass", "A sunday afternoon on the island of La Grande Jatte"])
    await artPieces[19].addKeywordsAsync(["angels", "bow and arrow", "The triumph of Galatea"])
    await artPieces[20].addKeywordsAsync(["dogs", "gamble", "poker", "cards", "dogs playing poker"])

    // Construct random comments 
    const bulkComments = [];
    for(let i = 1; i<= artPieces.length; i++){
        let rand = Math.floor(Math.random()*3);
        if (rand){
            for (let j = 1; j<=users.length; j++){
                rand = Math.floor(Math.random()*3);
                if (rand){
                    bulkComments.push({
                        content:lorem.generateParagraphs(1),
                        ArtPieceId:i,
                        UserId:j
                    })
                    console.log("made comment")
                }
            }
        }
    }

    // Bulk create Comments
    const comments = await Comment.bulkCreate(bulkComments)

    // construct likes
    const bulkLikes = [];
    for(let i = 1; i <= artPieces.length; i++){
        let rand = Math.floor(Math.random()*3);
        if (rand){
            for (let j = 1; j<=users.length; j++){
                rand = Math.floor(Math.random()*3);
                if (rand){
                    bulkLikes.push({
                        UserId: j,
                        ArtPieceId: i
                    })
                }
            }
        }
    }

    // bulk create likes
    const likes = await Like.bulkCreate(bulkLikes);




    console.log("seeded!")
    process.exit(0)
}

seed();
