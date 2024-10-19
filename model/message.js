import sequelize from "../db/dbConfi.js"
import  DataType  from 'sequelize';
import Client from './clientModel.js';
const Message = sequelize.define('Message', {
  id: {
    type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
  },
  senderId: {
    type: DataType.UUID,  // Change to UUID to match Client.id
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  receiverId: {
    type: DataType.UUID,  // Change to UUID to match Client.id
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  message: {
    type: DataType.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
});
export default Message;
