import express from "express"
import bodyParser from "body-parser"
import  sequelize  from "./db/dbConfi.js"
import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import Routes from './routes/clientRoutes.js'
import dotenv from "dotenv";
const app = express();
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use( express.static(path.join(__dirname, 'uploadedDoc')));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const port = process.env.Port;
app.use('/', Routes);
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