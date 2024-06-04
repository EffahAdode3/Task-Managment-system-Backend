import express from "express"
import bodyParser from "body-parser"
import  sequelize  from "./db/dbConfi.js"
import cors from 'cors'
import clientRoutes from './routes/clientRoutes.js'
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.Port;
app.use('/', clientRoutes  );

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`App is running on ${port}`);
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  (async () => {
    await sequelize.sync();
  })();