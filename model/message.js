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
    type: DataType.INTEGER,
    allowNull: false,
    // references: {
    //   model: Client,
    //   key: 'id',
    // },
  },
  receiverId: {
    type: DataType.INTEGER,
    allowNull: false,
    // references: {
    //   model: Client,
    //   key: 'id',
    // },
  },
  message: {
    type: DataType.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
});
export default Message;
