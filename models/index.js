const User = require('./User');
const ArtPiece = require('./ArtPiece');
const Comment = require('./Comment');
const Keyword = require('./Keyword');
const ArtPieceKeyword = require('./ArtPieceKeyword.js');
const Like = require('./Like')
const Relationship = require('./Relationship')


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



// Relationship.hasOne(User, {foreignKey:'id',as:"UserId"})
// Relationship.hasOne(User, {foreignKey:'id',as:"FollowingId"})

// User.belongsToMany(User, {foreignKey:'UserId', as:'Followers',through:Relationship})
// User.belongsToMany(User, {foreignKey:'FollowingId', as:'Following',through:Relationship})

// User.hasMany(Relationship);

Relationship.belongsTo(User, {
    as: 'Following',
    foreignKey: 'FollowingId'
})

Relationship.belongsTo(User, {
    as: 'Follower',
    foreignKey: 'UserId'
})

User.hasMany(Relationship);



module.exports = {
    User,
    ArtPiece,
    Comment,
    Keyword,
    ArtPieceKeyword,
    Like,
    Relationship
}