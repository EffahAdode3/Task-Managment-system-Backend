// Import Sequelize and necessary modules
import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";
import Client from "./clientModel.js";

// Function to format date into a string representation
const formatDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${daysOfWeek[date.getUTCDay()]} ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
};

// Define the TodoList model
const TodoList = sequelize.define(
  "TodoList",
  {
    // Define fields for the TodoList model
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
  // Include timestamps in the model
  { timestamps: true }
);

// Hook to format timestamps before creating a TodoList record
TodoList.beforeCreate((todo) => {
  // Format createdAt and updatedAt timestamps
  todo.createdAt = formatDate(new Date(todo.createdAt));
  todo.updatedAt = formatDate(new Date(todo.updatedAt));
});

// Hook to format updatedAt timestamp before updating a TodoList record
TodoList.beforeUpdate((todo) => {
  // Format updatedAt timestamp
  todo.updatedAt = formatDate(new Date(todo.updatedAt));
});

// Establish a relationship between TodoList and Client models
TodoList.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(TodoList, { foreignKey: 'client_id' });

// Export the TodoList model as the default
export default TodoList;
