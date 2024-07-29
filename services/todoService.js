import Todolist from '../model/TodoList.js';

 export const createTodo = async (todoData) => {
    try {
        return await Todolist.create(todoData);
    } catch (error) {
        console.error('Error creating todo', error);
        throw new Error('Error creating todo');
    }
};


export const getCreatedToDos = async (clientId) => {
    try {
        return await Todolist.findAll({
            where: { client_Id_As_Foreignkey: clientId },
            order: [['deadline', 'ASC']]
        });
    } catch (error) {
        console.error('Error fetching created to-dos', error);
        throw new Error('Error fetching created to-dos');
    }
};



export const findTodoById = async (id) => {
    try {
        return await Todolist.findByPk(id);
    } catch (error) {
        console.error('Error finding to-do item by ID', error);
        throw new Error('Error finding to-do item by ID');
    }
};

export const updateTodoStatus = async (todo, status) => {
    try {
        todo.statuses = status;
        await todo.save();
        return todo;
    } catch (error) {
        console.error('Error updating to-do item status', error);
        throw new Error('Error updating to-do item status');
    }
};


export const updateTodo = async (todo, updates) => {
    try {
        // Update only the fields that are provided in the updates object
        if (updates.category) todo.category = updates.category;
        if (updates.newTodo) todo.newTodo = updates.newTodo;
        if (updates.deadline) todo.deadline = updates.deadline;
        if (updates.statuses) todo.statuses = updates.statuses;
        if (updates.reminderTime) todo.reminderTime = updates.reminderTime;

        await todo.save();
        return todo;
    } catch (error) {
        console.error('Error updating to-do item', error);
        throw new Error('Error updating to-do item');
    }
};


export const deleteTodo = async (todo) => {
    try {
        await todo.destroy();
    } catch (error) {
        console.error('Error deleting to-do item', error);
        throw new Error('Error deleting to-do item');
    }
};


export const getTasksByCategory = async (clientId, category) => {
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
        console.error('Error fetching tasks by category', error);
        throw new Error('Error fetching tasks by category');
    }
};



export default {  getCreatedToDos,  createTodo, findTodoById, 
    updateTodoStatus, updateTodo, deleteTodo,   getTasksByCategory };


