const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Relationship extends Model {}

Relationship.init({
    // add properites here, ex:
},{
    sequelize,
    createdAt:false,
    updatedAt: false
});

module.exports=Relationship