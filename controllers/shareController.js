import {findUsersByEmails } from '../services/userService.js'
import {findTodoById} from '../services/todoService.js'
import {shareTodoList} from '../services/shareService.js'
import { sendNotificationEmail } from '../utils/emailUtils.js'; 


const assignShareController = async (req, res) => {
    try {
        const createdBy = req.Client_id;
        const todoId = req.params.todoId;
        const emails = req.body.emails;

        // Find users by email
        const users = await findUsersByEmails(emails);
        const clientIds = users.map(user => user.id);

        // Find the to-do list by ID
        const todoList = await findTodoById(todoId);
        if (!todoList) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Create share records for each user
        const shareTodos = await shareTodoList(clientIds, todoList.id, createdBy);

        // Send notification emails to users
        await Promise.all(
            users.map(user => sendNotificationEmail(user.email, todoList.newTodo))
        );

        if (shareTodos.length > 0) {
            return res.status(201).json({ message: "To-Do list shared successfully", shareTodos });
        }
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            // Log validation errors
            error.errors.forEach(err => {
                console.error(err.message, err.path, err.value);
            });
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        } else {
            // Log generic error message
            console.error('Error:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
};

export default {assignShareController}