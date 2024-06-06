import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
import Client from "./clientModel.js";

const formatDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${daysOfWeek[date.getUTCDay()]} ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
};

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
      type: DataType.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

TodoList.beforeCreate((todo) => {
  todo.createdAt = formatDate(new Date(todo.createdAt));
  todo.updatedAt = formatDate(new Date(todo.updatedAt));
});

TodoList.beforeUpdate((todo) => {
  todo.updatedAt = formatDate(new Date(todo.updatedAt));
});

TodoList.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(TodoList, { foreignKey: 'client_id' });

export default TodoList;
