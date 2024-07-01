import moment from 'moment';
import Client from '../model/clientModel.js';
import Todolist from '../model/TodoList.js';

const checkReminders = async () => {
    try {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const reminders = await Todolist.findAll({ where: { reminderTime: currentTime } });

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
