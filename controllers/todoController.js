import { createTodo, getCreatedToDos, findTodoById, updateTodoStatus, updateTodo, deleteTodo, getTasksByCategory} from '../services/todoService.js';
import {getSharedToDos} from '../services/shareService.js'
import { getUserById } from '../services/userService.js';

const createTodoController = async (req, res) => {
    try {
        const client_Id_As_Foreignkey = req.Client_id;
        console.log(client_Id_As_Foreignkey);
        const { newTodo, category, deadline, statuses, reminderTime } = req.body;

        const todoData = {
            newTodo,
            category,
            deadline,
            client_Id_As_Foreignkey,
            statuses,
            reminderTime,
        };

        const createtodo = await createTodo(todoData);
        if (createtodo) {
            return res.status(201).json({ message: "Todo created successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllToDoList = async (req, res) => {
    try {
        const clientId = req.Client_id;

        // Fetch user by client ID
        const user = await getUserById(clientId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch created to-dos
        const createdToDos = await getCreatedToDos(clientId);

        // Fetch shared to-dos
        const sharedToDos = await getSharedToDos(clientId);

        // Combine created and shared to-dos
        const allToDoList = [
            ...createdToDos,
            ...sharedToDos
        ];

        // Sort the combined list by deadline
        allToDoList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        if (allToDoList.length === 0) {
            return res.status(409).json({ message: 'No To Do List found' });
        } else {
            return res.status(200).json({ message: "Success", allToDoList });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const todo = await findTodoById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-Do id not found' });
        }

        const updatedTodo = await updateTodoStatus(todo, status);

        res.json({ message: 'Status updated', todo: updatedTodo });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Error updating status' });
    }
};

const updateTodoController = async (req, res) => {
    const { id } = req.params;
    const { category, newTodo, deadline, statuses } = req.body;

    try {
        const todo = await findTodoById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }

        // Prepare updates object based on request body
        const updates = {
            category,
            newTodo,
            deadline,
            statuses
        };

        const updatedTodo = await updateTodo(todo, updates);

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodoController = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await findTodoById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }

        await deleteTodo(todo);

        res.status(204).json({ message: 'To-do item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTodoByCategoryController = async (req, res) => {
    try {
        const category = req.params.category;
        const clientId = req.Client_id;

        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        // Fetch tasks by category for the authenticated user
        const tasks = await getTasksByCategory(clientId, category);

        if (tasks.length === 0) {
            return res.status(409).json({ message: 'No To Do List found' });
        } else {
            return res.status(200).json({ message: "Success", tasks });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
};





export default {createTodoController, getAllToDoList, updateStatus, 
    updateTodoController, deleteTodoController, getTodoByCategoryController };
