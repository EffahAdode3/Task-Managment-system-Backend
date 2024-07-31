
import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
import Client from "./clientModel.js";
import Todolist from "./TodoList.js";

const Share = sequelize.define("Share", {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Share_With_Client_Id: {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  Todolist_Id: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Todolist,
      key: 'id',
    },
  },
  Created_By: {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
},
 { timestamps: true });


Share.belongsTo(Client, { as: 'Client', foreignKey: 'Share_With_Client_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Share.belongsTo(Todolist, { as: 'Todolist', foreignKey: 'Todolist_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Client.hasMany(Share, { as: 'Shares', foreignKey: 'Share_With_Client_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Todolist.hasMany(Share, { as: 'Shares', foreignKey: 'Todolist_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Share.belongsTo(Client, { as: 'Creator', foreignKey: 'Created_By', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Client.hasMany(Share, { as: 'CreatedShares', foreignKey: 'Created_By', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Todolist.belongsTo(Client, { as: 'Owner', foreignKey: 'client_Id_As_Foreignkey', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Client.hasMany(Todolist, { as: 'TodoLists', foreignKey: 'client_Id_As_Foreignkey', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
export default Share;





