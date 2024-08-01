import  sequelize  from "sequelize";
import dotenv from 'dotenv'
import mysql2 from 'mysql2';
dotenv.config()
const Sequelize = new sequelize(
    process.env.DB_Name,
    process.env.USER_NAME,
    process.env.Password,
 
     {
        host: process.env.Host || 'localhost',
        port: process.env.Port || 3306,
        port: process.env.Port,
        dialect: 'mysql', 
        dialectModule: mysql2,
        logging: false
}

// {
//     host: 'localhost',
//     dialect:"mysql", 
//     logging:false
// }

);
export default Sequelize