const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class ArtPieceKeyword extends Model {}

ArtPieceKeyword.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      }
},{
    sequelize,
    createdAt:false,
    updatedAt: false
});

module.exports=ArtPieceKeyword