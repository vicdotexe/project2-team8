const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class CartItem extends Model {
    async remove(){
        return await CartItem.destroy({where:{id:this.id}});
    }
}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      }
},{
    sequelize,
    createdAt:false,
    updatedAt:false
});

module.exports=CartItem