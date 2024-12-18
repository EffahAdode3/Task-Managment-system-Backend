// import express from "express"
// import bodyParser from "body-parser"
// import  sequelize  from "./db/dbConfi.js"
// import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import Routes from './routes/clientRoutes.js'
// import dotenv from "dotenv";
// const app = express();
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/uploadfolder', express.static(path.join(__dirname, './uploadfolder')));
// const port = process.env.Port;
// app.use('/', Routes);
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     app.listen(port, () => {
//         console.log(`App is running on ${port}`);
//       });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
//   (async () => {
//     await sequelize.sync();
//   })();

import express from "express";
import bodyParser from "body-parser";
import sequelize from "./db/dbConfi.js";
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Routes from './routes/clientRoutes.js';
import dotenv from "dotenv";
import { socketHandler } from './utils/socket.js'
import { Server } from 'socket.io';

dotenv.config();
const app = express();
// Initialize Express app and HTTP server

const server = http.createServer(app)
// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static folder for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploadfolder', express.static(path.join(__dirname, './uploadfolder')));

// Set up port from environment variable
const port = process.env.PORT || 3000;

// API Routes
app.use('/', Routes);


// Socket.io Setup
const io = new Server(server, { cors: { origin: '*' } });
socketHandler(io);  // Pass the io instance to the socket handler
// Database connection and server start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Sync the database
    await sequelize.sync();

    // Start the server
    server.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
