import  express  from "express";
import client from "../controller/clientController.js"
import auth from '../middleware/auth.js'
const router = express.Router();
router.post('/createuser', client.SignUpClient)
router.post('/login', auth.generateToken, client.Login )
router.post('/todoList', auth.tokenVerification, client.todoList)
router.get('/getAllToDo', auth.tokenVerification, client.getAllToDoList )
export default router;