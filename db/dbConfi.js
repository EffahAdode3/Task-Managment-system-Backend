import  sequelize  from "sequelize";
import dotenv from 'dotenv'
import mysql2 from 'mysql2';
dotenv.config()
const Sequelize = new sequelize(
    process.env.DB_Name,
    process.env.USER_NAME,
    process.env.PASSWORD,
     {
        // host: process.env.HOST || 'localhost',
        // port: process.env.PORT || 3306, 
        port:3306,
    dialectModule: mysql2,
    logging:false
});

export default Sequelize