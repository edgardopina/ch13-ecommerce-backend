const sequelize = require('../config/connection'); // import sequelize connection
const { Model, DataTypes} = require('sequelize'); // import Model and DataTypes from sequelize

// declare and initialize ProductTag model (table) by extending from Sequelize's Model class
class ProductTag extends Model {}
ProductTag.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      product_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'product',
            key: 'id',
         },
      },
      tag_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'tag',
            key: 'id',
         },
      },
   },
   {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product_tag',
   }
);

module.exports = ProductTag;
