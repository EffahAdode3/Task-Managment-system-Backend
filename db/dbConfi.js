import  sequelize  from "sequelize";
import dotenv from 'dotenv'
import mysql2 from 'mysql2';
dotenv.config()
const Sequelize = new sequelize(
    process.env.DB_Name,
    process.env.USER_NAME,
    process.env.PASSWORD,
     {
    host: 'localhost',
    dialect:"mysql", 
    dialectModule: mysql2,
    logging:true
});

export default Sequelize