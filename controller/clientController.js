import Client from "../model/clientModel.js";
import Todo from '../model/TodoList.js'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
        const hashedPassword = await bcryptjs.hash(password, 10);
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
        const {newTodo, category, deadline,  } = req.body;
        const todoData = {
            newTodo,
            category,
            deadline,
            client_id
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
    allToDoList = await Todo.findAll({
      // attributes: ['newTodo', 'category', 'deadline', 'client_id'],
      where: { 
        client_id: user.id ,
      },
      order: [
        ['deadline', 'DESC'],  // Sort by deadline in ascending order
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

  
export default {SignUpClient,  Login, todoList, getAllToDoList}