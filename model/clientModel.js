import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },
    userName: {
      type: DataType.STRING,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: true,
    }, 
    ResetToken: {
      type: DataType.STRING,
      allowNull: true,
    }, 

  },
  { timestamps: true }
);
export default Client;
