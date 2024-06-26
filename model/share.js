// import sequelize from "../db/dbConfi.js";
// import DataType from "sequelize";
// import Client from "./clientModel.js";
// import Todolist from "./TodoList.js";
// const Share  = sequelize.define(
//   "share",
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
  
//   },
//   { timestamps: true }
// );

// Client.belongsToMany(Todolist, { through: Share, foreignKey: 'Client_Id' });


// Share.belongsTo(Client, { foreignKey: 'Created_By' });
// Client.hasMany(Share, { foreignKey: 'Created_By' });

// Share.belongsTo(Todolist, { foreignKey: 'Todolist_Id' });
// Todolist.hasMany(Share, { foreignKey: 'Todolist_Id' });

// Todolist.belongsTo(Client, { foreignKey: 'client_id' });
// Client.hasMany(Todolist, { foreignKey: 'client_id' });

// export default Share;

// import sequelize from "../db/dbConfi.js";
// import DataType from "sequelize";
// import Client from "./clientModel.js";
// import Todolist from "./TodoList.js";

// const Share = sequelize.define("Share", {
//   id: {
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   Client_Id: {
//     type: DataType.UUID,
//     allowNull: false,
//   },
//   Todolist_Id: {
//     type: DataType.INTEGER,
//     allowNull: false,
//   },
//   Created_By: {
//     type: DataType.UUID,
//     allowNull: false,
//   },
// }, { timestamps: true });

// Client.belongsToMany(Todolist, { through: Share, foreignKey: 'Client_Id' });
// // Todolist.belongsToMany(Client, { through: Share, foreignKey: 'Todolist_Id' });

// Share.belongsTo(Todolist, { foreignKey: 'Todolist_Id' });
// Todolist.hasMany(Share, { foreignKey: 'Todolist_Id' });

// Share.belongsTo(Client, { foreignKey: 'Created_By' });
// Client.hasMany(Share, { foreignKey: 'Created_By' });

//  Todolist.belongsTo(Client, { foreignKey: 'client_id' });
//  Client.hasMany(Todolist, { foreignKey: 'client_id' });

// export default Share;

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
}, { timestamps: true });

// Define associations
Share.belongsTo(Client, { as: 'Client', foreignKey: 'Share_With_Client_Id' });
Share.belongsTo(Todolist, { as: 'Todolist', foreignKey: 'Todolist_Id' });

Client.hasMany(Share, { as: 'Shares', foreignKey: 'Share_With_Client_Id' });
Todolist.hasMany(Share, { as: 'Shares', foreignKey: 'Todolist_Id' });

Share.belongsTo(Client, { as: 'Creator', foreignKey: 'Created_By' });
Client.hasMany(Share, { as: 'CreatedShares', foreignKey: 'Created_By' });

Todolist.belongsTo(Client, { as: 'Owner', foreignKey: 'client_Id_As_Foreignkey' });
Client.hasMany(Todolist, { as: 'TodoLists', foreignKey: 'client_Id_As_Foreignkey' });

export default Share;


