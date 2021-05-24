const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("orders", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    productName: {
      type: DataTypes.STRING,
      primaryKey: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
  });
};
