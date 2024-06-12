import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
import Client from "./clientModel.js";
const TodoList = sequelize.define(
  "TodoList",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    newTodo: {
      type: DataType.STRING,
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
TodoList.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(TodoList, { foreignKey: 'client_id' });
export default TodoList;
