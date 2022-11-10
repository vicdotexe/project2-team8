const User = require('./User');
const ArtPiece = require('./ArtPiece');
const Comment = require('./Comment');
const Keyword = require('./Keyword');
const ArtPieceKeyword = require('./ArtPieceKeyword.js');
const Like = require('./Like')


// user - artpeice
User.hasMany(ArtPiece, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
ArtPiece.belongsTo(User);

// user - comment
User.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
Comment.belongsTo(User);

// artpeice - comment
ArtPiece.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
Comment.belongsTo(ArtPiece);

// kewords
ArtPiece.belongsToMany(Keyword, {through: ArtPieceKeyword})
Keyword.belongsToMany(ArtPiece, {through: ArtPieceKeyword})

Like.belongsTo(User);
Like.belongsTo(ArtPiece);

ArtPiece.hasMany(Like);
User.hasMany(Like);


module.exports = {
    User,
    ArtPiece,
    Comment,
    Keyword,
    ArtPieceKeyword,
    Like
}