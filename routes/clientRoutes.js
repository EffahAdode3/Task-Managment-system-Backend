import  express  from "express";
import userController from "../controllers/userController.js";
import todoController from "../controllers/todoController.js";
import shareController from "../controllers/shareController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post('/createuser', userController.SignUpClient);
router.post('/login', auth.loginMiddleware, userController.loginController);
router.post('/todoList', auth.tokenVerification, todoController.createTodoController );
router.get('/getAllToDo', auth.tokenVerification, todoController.getAllToDoList);
router.put('/updateStatus/:id', auth.tokenVerification, todoController.updateStatus);
router.put('/Updateatodo/:id', auth.tokenVerification, todoController.updateTodoController);
router.delete('/deleteTodo/:id', auth.tokenVerification, todoController.deleteTodoController)
router.get('/getClientEmail/:email', auth.tokenVerification, userController.searchEmailController);
router.post('/assign/:todoId',  auth.tokenVerification, shareController.assignShareController)
router.get('/getTOdoByCategory/:category', auth.tokenVerification, todoController.getTodoByCategoryController)
 export default router;


 
// router.post('/createuser', client.SignUpClient)
// router.post('/login', auth.generateToken, client.Login )
// router.post('/todoList', auth.tokenVerification, client.todoList)
// router.get('/getAllToDo', auth.tokenVerification, client.getAllToDoList )
// router.get('/getTOdoByCategory/:category', auth.tokenVerification, client.getToToByCategory)
// router.put('/updateStatus/:id', auth.tokenVerification,  client.updateStatus)
// router.put('/Updateatodo/:id', auth.tokenVerification, client.updateTodo);
// router.delete('/deleteTodo/:id', auth.tokenVerification, client.deleteTodo)
// router.get('/getClientEmail/:email', auth.tokenVerification, client.searchEmail)
// router.post('/assign/:todoId', auth.tokenVerification, client.assignTodolist)
// export default router;