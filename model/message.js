import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Your Sequelize instance
import User from './User.js'; // Import User model
import Client from './clientModel.js';

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
// Define associations
Client.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
Client.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
Message.belongsTo(Client, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(Client, { foreignKey: 'receiverId', as: 'receiver' });

export default Message;
