const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Keyword extends Model {}

Keyword.init({
    // add properites here, ex:
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    createdAt:false,
    updatedAt: false
});

module.exports=Keyword