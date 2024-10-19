import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
// import Client from "./clientModel.js";
const Todolist = sequelize.define(
  "TodoList",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    newTodo: {
      type: DataType.TEXT,
      allowNull: true,
    },
    category: {
      type: DataType.STRING,
      allowNull: true,
    },
    deadline: {
      type: DataType.DATE,
      allowNull: true,
    },
    statuses: {
      type: DataType.STRING,
      allowNull: true,
    },
    reminderTime: {
      type: DataType.DATE,
      allowNull: true,
    },
  //   documents:{
  //     type: DataType.TEXT,
  //     allowNull: true,
  //  },
  documents: {
    type: DataType.STRING,
    allowNull: true
  },
  fileName:{
    type: DataType.STRING,
    allowNull: true
  }
  },
  { timestamps: true }
);
export default Todolist;
