const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    content: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,                 
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
    }
},{
    sequelize,
    updatedAt:false
});

module.exports=Comment