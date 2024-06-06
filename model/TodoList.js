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
      type: DataType.DATE,
      allowNull: false,
    },
    formattedCreatedAt: {
      type: DataType.STRING,
      allowNull: true,
    },
    formattedUpdatedAt: {
      type: DataType.STRING,
      allowNull: true,
    },
  },
  // { timestamps: true }
);

TodoList.beforeCreate((todo) => {
  const now = new Date();
  todo.formattedCreatedAt = formatDate(now);
  todo.formattedUpdatedAt = formatDate(now);
});

TodoList.beforeUpdate((todo) => {
  todo.formattedUpdatedAt = formatDate(new Date());
});

TodoList.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(TodoList, { foreignKey: 'client_id' });

export default TodoList;
