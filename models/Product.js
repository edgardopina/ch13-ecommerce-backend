const sequelize = require('../config/connection'); // import sequelize connection
const { Model, DataTypes} = require('sequelize'); // import Model and DataTypes from sequelize

// declare and initialize Product model (table) by extending from Sequelize's Model class
class Product extends Model {}
Product.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      product_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      price: {
         type: DataTypes.DECIMAL(10,2),
         allowNull: false,
         validate: {
            isDecimal: true,
         },
      },
      stock: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 10,
         validate: {
            isNumeric: true,
         },
      },
      category_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'category',
            key: 'id',
         },
      },
   },
   {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product',
   }
);

module.exports = Product;
