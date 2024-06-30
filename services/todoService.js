import Todolist from '../model/TodoList.js';

 export const createTodo = async (todoData) => {
    try {
        return await Todolist.create(todoData);
    } catch (error) {
        throw new Error('Error creating todo');
    }
};


// const getUserById = async (clientId) => {
//     try {
//         return await Client.findByPk(clientId);
//     } catch (error) {
//         throw new Error('Error finding user');
//     }
// };

const getCreatedToDos = async (clientId) => {
    try {
        return await Todolist.findAll({
            where: { client_Id_As_Foreignkey: clientId },
            order: [['deadline', 'ASC']]
        });
    } catch (error) {
        throw new Error('Error fetching created to-dos');
    }
};



const findTodoById = async (id) => {
    try {
        return await Todolist.findByPk(id);
    } catch (error) {
        throw new Error('Error finding to-do item by ID');
    }
};

const updateTodoStatus = async (todo, status) => {
    try {
        todo.statuses = status;
        await todo.save();
        return todo;
    } catch (error) {
        throw new Error('Error updating to-do item status');
    }
};


const updateTodo = async (todo, updates) => {
    try {
        // Update only the fields that are provided in the updates object
        if (updates.category) todo.category = updates.category;
        if (updates.newTodo) todo.newTodo = updates.newTodo;
        if (updates.deadline) todo.deadline = updates.deadline;
        if (updates.statuses) todo.statuses = updates.statuses;

        await todo.save();
        return todo;
    } catch (error) {
        throw new Error('Error updating to-do item');
    }
};


const deleteTodo = async (todo) => {
    try {
        await todo.destroy();
    } catch (error) {
        throw new Error('Error deleting to-do item');
    }
};


const getTasksByCategory = async (clientId, category) => {
    try {
        const tasks = await Todolist.findAll({
            where: {
                client_id: clientId,
                category: category,
            },
            order: [['deadline', 'ASC']]
        });
        return tasks;
    } catch (error) {
        throw new Error('Error fetching tasks by category');
    }
};



export default {  getCreatedToDos,  createTodo, findTodoById, 
    updateTodoStatus, updateTodo, deleteTodo,   getTasksByCategory };


