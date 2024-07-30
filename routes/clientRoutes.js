import  express  from "express";
import userController from "../controllers/userController.js";
import todoController from "../controllers/todoController.js";
import shareController from "../controllers/shareController.js";
import auth from "../middleware/auth.js";
import uploadExcel from "../utils/uploadExcel.js";
import multer from 'multer';
import uploadDoc from "../utils/uploadDoc.js";

const storage =  multer.memoryStorage()
const upload = multer({storage:storage})

const router = express.Router();
router.post('/createuser', userController.SignUpClient);
router.post('/login', auth.loginMiddleware, userController.loginController);
router.post('/todoList', auth.tokenVerification, uploadDoc, todoController.createTodoController );
router.get('/getAllToDo', auth.tokenVerification, todoController.getAllToDoList);
router.put('/updateStatus/:id', auth.tokenVerification, todoController.updateStatus);
router.put('/Updateatodo/:id', auth.tokenVerification, todoController.updateTodoController);
router.delete('/deleteTodo/:id', auth.tokenVerification, todoController.deleteTodoController)
router.get('/getClientEmail/:email', auth.tokenVerification, userController.searchEmailController);
router.post('/assign/:todoId',  auth.tokenVerification, shareController.assignShareController)
router.get('/getTOdoByCategory/:category', auth.tokenVerification, todoController.getTodoByCategoryController)
router.post('/forgetPassword', userController.passwordRestLink)
router.post('/uploadexcel', upload.single('file'), uploadExcel);
router.post('/resetPassword/:token', userController.restPassword )

 export default router;


 