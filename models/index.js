const User = require('./User');
const ArtPeice = require('./ArtPeice');
const Comment = require('./Comment');
const Keyword = require('./Keyword');
const ArtPeiceKeyword = require('./ArtPeiceKeyword.js');
const CartItem = require('./CartItem');


// user - artpeice
User.hasMany(ArtPeice, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
ArtPeice.belongsTo(User);

// user - comment
User.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
Comment.belongsTo(User);

// artpeice - comment
ArtPeice.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
Comment.belongsTo(ArtPeice);

// kewords
ArtPeice.belongsToMany(Keyword, {through: ArtPeiceKeyword})
Keyword.belongsToMany(ArtPeice, {through: ArtPeiceKeyword})

// cart
ArtPeice.belongsToMany(User,{through:CartItem})
User.hasMany(CartItem)



// 

module.exports = {
    User,
    ArtPeice,
    Comment,
    Keyword,
    ArtPeiceKeyword
}