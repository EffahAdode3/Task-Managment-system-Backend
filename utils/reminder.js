import moment from 'moment';
import Client from '../model/clientModel.js';
import Todolist from '../model/TodoList.js';
import { sendReminderEmail } from './emailUtils.js';

const checkReminders = async () => {
    try {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const reminders = await Todolist.findAll({ where: { reminderTime: currentTime } })

        if (reminders.length === 0) {
            console.log('No reminders found at this time.');
        } else {
            console.log(`Found ${reminders.length} reminders.`);
        }
        
        for (const reminder of reminders) {
            const { newTodo, category, deadline, reminderTime, client_Id_As_Foreignkey } = reminder;

            const client = await Client.findByPk(client_Id_As_Foreignkey);
            if (client && client.email) {
                const subject = `Reminder: ${category}`;
                const text = `This is a reminder for your to-do: "${newTodo}" which is due on ${deadline}.`;

                await sendReminderEmail(client.email, subject, text);
            }
        }
    } catch (error) {
        console.error('Error checking reminders:', error);
        throw new Error(`Error checking reminders: ${error.message}`);
    }
};

// setInterval(checkReminders, 43200000);
setInterval(checkReminders, 60000);
