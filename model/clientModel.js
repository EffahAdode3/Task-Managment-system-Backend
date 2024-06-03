import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    }, 
  },
  { timestamps: true }
);
export default Client;
