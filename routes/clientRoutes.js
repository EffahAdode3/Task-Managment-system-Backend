import  express  from "express";
import client from "../controller/clientController.js"
import auth from '../middleware/auth.js'
const router = express.Router();
router.post('/createuser', client.SignUpClient)
router.post('/login', auth.generateToken, client.Login )
router.post('/todoList', auth.tokenVerification, client.todoList)
router.get('/getAllToDo', auth.tokenVerification, client.getAllToDoList )
router.get('/getTOdoByCategory/:category', auth.tokenVerification, client.getToToByCategory)
router.put('/updateStatus/:id', auth.tokenVerification,  client.updateStatus)
router.put('/Updateatodo/:id', auth.tokenVerification, client.updateTodo);
router.delete('/deleteTodo/:id', auth.tokenVerification, client.deleteTodo)
router.get('/getClientEmail/:email', auth.tokenVerification, client.searchEmail)
router.post('/assign/:todo_Id', auth.tokenVerification, client.assignTodolist)
export default router;