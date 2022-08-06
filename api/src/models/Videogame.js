const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaDeLanzamiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    plataformas: {
      type: DataTypes.STRING, // DataTypes.ARRAY(DataTypes.STRING)
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
