// import Client from "../model/clientModel.js";
// import Todolist from "../model/TodoList.js";
// import bcryptjs from "bcryptjs";
// import { Op } from "sequelize";
// import dotenv from 'dotenv';
// import Share from "../model/share.js";
// import moment from "moment";
// import nodemailer from "nodemailer"
// dotenv.config();
// const JWT_SECRET = process.env.ACCESS_TOKEN;


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS
//   }
// });

// /// email for Reminder 

// const sendReminderEmail = (to, subject, text) => {
//   const mailOptions = {
//       from: 'maximnyansa75@gmail.com',
//       to,
//       subject,
//       text
//   };

//   return transporter.sendMail(mailOptions);
// };

// const checkReminders = async () => {
//   try {
//     const currentTime = moment().format('YYYY-MM-DD');
//     console.log(currentTime)
//     const reminders = await Todolist.findAll({ where: { reminderTime: currentTime } });

//     for (const reminder of reminders) {
//       const { newTodo, category, deadline, reminderTime, client_Id_As_Foreignkey } = reminder;

//       const client = await Client.findByPk(client_Id_As_Foreignkey);
//       if (client && client.email) {
//         const subject = `Reminder: ${category}`;
//         const text = `This is a reminder for your to-do: "${newTodo}" which is due on ${deadline}.`;

//         try {
//           await sendReminderEmail(client.email, subject, text);
//           console.log(`Reminder email sent to ${client.email}`);
//         } catch (error) {
//           console.error(`Error sending email to ${client.email}:`, error);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error checking reminders:', error);
//   }
// };

// // Set interval to check reminders every minute
// // setInterval(checkReminders, 43200000);
// setInterval(checkReminders, 60000);
// // For every 24 hours
// // setInterval(checkReminders, 86400000);


// /// Email Function  for assign
// const sendNotificationEmail = async (email,  newTodo) => {
//   const mailOptions = {
//     from: 'maximnyansa75@gmail.com',
//     to: email,
//     subject: 'You have been assigned a new To-Do List',
//     text: `You have been assigned to the To-Do list titled "${ newTodo}". Please check your dashboard for more details.`,
//   };
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Notification email sent to ${email}`);
//   } catch (error) {
//     console.error(`Error sending email to ${email}:`, error.message);
//   }
// };


// //sign up
// const SignUpClient = async (req, res) => {
//     try {
//         const { userName, email, password } = req.body;
//         const existingUser = await Client.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(409).json({ message: 'exist' });
//         }
//         const hashedPassword = await bcryptjs.hash(password, 8);
//         const newUser = await Client.create({
//             userName,
//             email,
//             password: hashedPassword,
//         });
//         if (newUser) {
//           return res.status(201).json({message:" Successfull USer"});   
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };
// //Login
// const Login = async(req, res) =>{
//     const token = req.token;
//     const User = req.body;
//     if(User){
//       return res.status(200).json({message:" Successfull login",token, user:req.user});    
//     }
// };
// // create To do  list
// const todoList = async (req, res) =>{
//     try {
//         const client_Id_As_Foreignkey =  req.Client_id;
//         console.log(client_Id_As_Foreignkey);
//         const {newTodo, category, deadline, statuses, reminderTime } = req.body;
//         const todoData = {
//             newTodo,
//             category,
//             deadline,
//             client_Id_As_Foreignkey,
//             statuses,
//             reminderTime 
//             };
//             const createtodo = await Todolist.create(todoData);
//             if(createtodo){
//                 return res.status(201).json({message: "Todo created successfully" });
//             }
//     } catch (error) {
//         console.error(error);
//        return res.status(500).json({ message: "Server error",  error});
//     }
// }

// /// get all to do list
// const getAllToDoList = async (req, res) => {
//   try {
//     const clientId = req.Client_id;
//     let allToDoList = [];

//     const user = await Client.findByPk(clientId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Fetch to-dos created by the user
//     const createdToDos = await Todolist.findAll({
//       where: { client_Id_As_Foreignkey: clientId },
//       order: [['deadline', 'ASC']]
//     });

//     // Fetch to-dos shared with the user
//     const sharedToDos = await Share.findAll({
//       where: {Share_With_Client_Id: clientId },
//       include: [{
//         model: Todolist,
//         as: 'Todolist'
//       }]
//     });

//     // Combine created and shared to-do lists
//     allToDoList = [
//       ...createdToDos,
//       ...sharedToDos.map(share => share.Todolist)
//     ];
    

//     // Sort the combined list by deadline
//     allToDoList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

//     if (allToDoList.length === 0) {
//       return res.status(409).json({
//         message: 'No To Do List found'
//       });
//     } else {
//       return res.status(200).json({
//         message: "Success",
//         allToDoList
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };





// // Get all by Category
// const getToToByCategory = async (req, res )=>{
//   try {
//     const category = req.params.category;
//     console.log(category)
//     const user = await Client.findByPk(req.Client_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (!category) {
//       return res.status(400).json({ error: 'Category is required' });
//     }

//     const tasks = await Todolist.findAll({
//       where: {
//         client_id: user.id,
//         category: category,
//       },
//       order: [
//         ['deadline', 'ASC'],  
//       ]
//     });
//     if (tasks.length === 0) {
//       return res.status(409).json({
//         message: 'No To Do List found'
//       });
//     } else {
//       return res.status(200).json({
//         message: "Success",
//         tasks 
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).json({ error: 'An error occurred while fetching tasks' });
//   }
// }


// // update the statues
// const updateStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const todo = await Todolist.findByPk(id);
//     console.log(todo);
//     console.log(status);
//     if (!todo) {
//       return res.status(404).json({ message: 'To-Do id not found' });
//     }
//     todo.statuses = status;
//     await todo.save();
//     res.json({ message: 'Status updated', todo });
//   } catch (error) {
//     console.error('Error updating status:', error);
//     res.status(500).json({ error: 'Error updating status' });
//   }
// };

// /// update To do
// const updateTodo = async (req, res) => {
//     const { id } = req.params;
//   const { category, newTodo, deadline, statuses } = req.body;
//   try {
//     const todo = await Todolist.findByPk(id);
//     console.log(todo);
//     console.log(category, newTodo, deadline, statuses );
//     if (!todo) {
//       return res.status(404).json({ message: 'To-do item not found' });
//     }
//     todo.category = category || todo.category;
//     todo.newTodo = newTodo || todo.newTodo;
//     todo.deadline = deadline || todo.deadline;
//     todo.statuses = statuses || todo.statuses;
//     await todo.save();
//     res.status(200).json(todo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // delete to do 
// const deleteTodo = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const todo = await Todolist.findByPk(id);

//     if (!todo) {
//       return res.status(404).json({ message: 'To-do item not found' });
//     }

//     await todo.destroy();

//     res.status(204).json({ message: 'To-do item deleted successfully', todo });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//  const searchEmail =  async (req, res) => {
//   try {
//   const email = req.params.email;
//   const users = await Client.findAll({ 
//     where: { email: { [Op.like]: `%${email}%` } } });
//   // res.json(users);
//   if (users){
//     return res.status(200).json({
//       message: "Success",
//       users 
//     });
//   }
// } catch (error) {
//   console.error('Error:', error.message);
//   return res.status(500).json({ message: error.message });
// }
// };



// /// assign to do list 
// const assignTodolist = async (req, res) => {
//   try {
//     const createdBy = req.Client_id;
//     const todoId = req.params.todoId;
//     const emails = req.body.emails;

//     // Find users by email
//     const users = await Client.findAll({ where: { email: emails } });
//     const clientIds = users.map(user => user.id);

//     // Find the to-do list by ID
//     const todoList = await Todolist.findByPk(todoId);
//     if (!todoList) {
//       return res.status(404).json({ message: 'Todo not found' });
//     }

//     // Create share records for each user
//     const shareTodos = await Promise.all(
//       clientIds.map(clientId => 
//         Share.create({
//           Share_With_Client_Id: clientId,
//           Todolist_Id: todoList.id,
//           Created_By: createdBy,
//         })
//       )
//     );

//     await Promise.all(
//       users.map(user => sendNotificationEmail(user.email, todoList.newTodo))
//     );

//     if (shareTodos.length > 0) {
//       return res.status(201).json({ message: "To-Do list shared successfully", shareTodos });
//     }
//   } catch (error) {
//     if (error.errors && error.errors.length > 0) {
//       // Log validation errors
//       error.errors.forEach(err => {
//         console.error(err.message, err.path, err.value);
//       });
//       return res.status(400).json({ message: 'Validation error', errors: error.errors });
//     } else {
//       // Log generic error message
//       console.error('Error:', error.message);
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };






// //   const clientId = req.Client_id;
// //  const getAllToDoList = async (req, res) => {
// //   try {
// //  
// //     const user = await findUserById(clientId);
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     const createdToDos = await fetchCreatedToDos(clientId);
// //     const sharedToDos = await fetchSharedToDos(clientId);

// //     const allToDoList = combineAndSortToDos(createdToDos, sharedToDos);

// //     if (allToDoList.length === 0) {
// //       return res.status(409).json({ message: 'No To Do List found' });
// //     } else {
// //       return res.status(200).json({ message: "Success", allToDoList });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// // const findUserById = async (clientId) => {
// //   return await Client.findByPk(clientId);
// // };

// // const fetchCreatedToDos = async (clientId) => {
// //   return await Todolist.findAll({
// //     where: { client_Id_As_Foreignkey: clientId },
// //     order: [['deadline', 'ASC']]
// //   });
// // };

// // const fetchSharedToDos = async (clientId) => {
// //   return await Share.findAll({
// //     where: { Share_With_Client_Id: clientId },
// //     include: [{
// //       model: Todolist,
// //       as: 'Todolist'
// //     }]
// //   });
// // };

// // const combineAndSortToDos = (createdToDos, sharedToDos) => {
// //   const combinedToDos = [
// //     ...createdToDos,
// //     ...sharedToDos.map(share => share.Todolist)
// //   ];

// //   return combinedToDos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
// // };


// export default {SignUpClient,  Login, 
//   todoList, getAllToDoList, getToToByCategory,
//    updateStatus, updateTodo, 
//    deleteTodo, searchEmail, assignTodolist} 