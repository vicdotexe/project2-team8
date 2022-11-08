const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const ArtPeiceKeyword = require('./ArtPieceKeyword');
const Keyword = require('./Keyword');

class ArtPeice extends Model {
    async addKeywordsAsync(keywords){
        for (let i = 0; i < keywords.length; i++){
            let [kw,created] = await Keyword.findOrCreate({where:{name:keywords[i]}});
            let id = kw.id;
            await ArtPeiceKeyword.create({ArtPeiceId: this.id, KeywordId: id})
        }
    }
    async resetKeywordsAsync(keywords){
        await ArtPeiceKeyword.destroy({where:{ArtPeiceId:this.id}});
        await this.addKeywordsAsync(keywords);
    }
    async getKeywordsPlainAsync(){
        const namesData = await ArtPeice.findOne({
            attributes:['Keywords.name'],
            where:{
            id: this.id
            },
            include:{
                model:Keyword,
                through:ArtPeiceKeyword,
                attributes:{
                    include:['name'],
                    exclude:'ArtPeiceKeyword'
                }
            }
        });

        return namesData.Keywords.map(word=>word.get({plain:true}).name);
    }

    async addCommentAsync(comment,fromUserId){
        return await Comment.create({UserId:fromUserId, conent:comment, ArtPeiceId:this.id})
    }

    
}

ArtPeice.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    path:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price:{
        type: DataTypes.DECIMAL
    },
    createdAt: {
       type: DataTypes.DATE,                 
     get() {
           return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
       }
    },
    updatedAt: {
       type: DataTypes.DATE,
       get() {
           return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
       }
    }
},{
    sequelize
});

module.exports=ArtPeice