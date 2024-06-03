import  sequelize  from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
const Sequelize = new sequelize(
    process.env.DB_Name,
    process.env.USER_NAME,
    process.env.PASSWORD,
     {
    host: 'localhost',
    dialect:"mysql", 
    logging:true
});

export default Sequelize