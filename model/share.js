import sequelize from "../db/dbConfi.js";
import DataType from "sequelize";
import Client from "./clientModel.js";
import Todolist from "./TodoList.js";
const Share  = sequelize.define(
  "share",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  
  },
  { timestamps: true }
);

Client.belongsToMany(Todolist, { through: Share, foreignKey: 'Client_Id' });
// Todolist.belongsToMany(Client, { through: Share, foreignKey: 'Todolist_Id' });

Share.belongsTo(Client, { foreignKey: 'Created_By' });
Client.hasMany(Share, { foreignKey: 'Created_By' });

Share.belongsTo(Todolist, { foreignKey: 'Todolist_Id' });
Todolist.hasMany(Share, { foreignKey: 'Todolist_Id' });
export default Share;
