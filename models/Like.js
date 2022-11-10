const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init({
    // add properites here, ex:
},{
    sequelize,
    createdAt:false,
    updatedAt: false
});

module.exports=Like