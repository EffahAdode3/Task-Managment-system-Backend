import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
import Client from "./clientModel.js";
const Todolist = sequelize.define(
  "TodoList",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    newTodo: {
      type: DataType.TEXT,
      allowNull: false,
    },
    category: {
      type: DataType.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataType.DATE,
      allowNull: false,
    },
    statuses: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Todolist;
