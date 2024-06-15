import Client from "../model/clientModel.js";
import Todo from '../model/TodoList.js'
import bcryptjs from "bcryptjs";
import { Op } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.ACCESS_TOKEN;

//sign up
const SignUpClient = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await Client.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'exist' });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        const newUser = await Client.create({
            userName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
          return res.status(201).json({message:" Successfull USer"});   
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
//Login
const Login = async(req, res) =>{
    const token = req.token;
    const User = req.body;
    if(User){
      return res.status(200).json({message:" Successfull login",token, user:req.user});    
    }
};
// create To do  list
const todoList = async (req, res) =>{
    try {
        const client_id =  req.Client_id;
        console.log(client_id);
        const {newTodo, category, deadline, statuses, } = req.body;
        const todoData = {
            newTodo,
            category,
            deadline,
            client_id,
            statuses,
            };
            const createtodo = await Todo.create(todoData);
            if(createtodo){
                return res.status(201).json({message: "Todo created successfully" });
            }
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: "Server error",  error});
    }
}


// Get all To do list
const getAllToDoList = async (req, res) => {
  try {
    console.log(req.Client_id);
    let allToDoList = [];
    const user = await Client.findByPk(req.Client_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const currentDate = new Date();
    allToDoList = await Todo.findAll({

      where: { 
        client_id: user.id ,
        // deadline: {
        //   [Op.gte]: currentDate 
        // }
      },
      order: [
        ['deadline', 'ASC'],  // Sort by deadline in ascending order
        // ['category', 'DESC']  // Then sort by category in ascending order
      ]// Sort by deadline in ascending order
    });
    if (allToDoList.length === 0) {
      return res.status(409).json({
        message: 'No To Do List found'
      });
    } else {
      return res.status(200).json({
        message: "Success",
        allToDoList
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}


// Get all by Category
const getToToByCategory = async (req, res )=>{
  try {
    const category = req.params.category;
    console.log(category)
    const user = await Client.findByPk(req.Client_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const tasks = await Todo.findAll({
      where: {
        client_id: user.id,
        category: category,
      },
      order: [
        ['deadline', 'ASC'],  
      ]
    });
    if (tasks.length === 0) {
      return res.status(409).json({
        message: 'No To Do List found'
      });
    } else {
      return res.status(200).json({
        message: "Success",
        tasks 
      });
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
}


// update the statues

const updateStatus = async (req, res) => {
  const { id } = req.params.id;
  const { status } = req.body;

  try {
    const todo = await Todo.findByPk(id);
    console.log(todo);
    console.log(status);
    if (!todo) {
      return res.status(404).json({ message: 'To-Do id not found' });
    }
    todo.statuses = status;
    await todo.save();
    res.json({ message: 'Status updated', todo });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Error updating status' });
  }
};
export default {SignUpClient,  Login, todoList, getAllToDoList, getToToByCategory, updateStatus}