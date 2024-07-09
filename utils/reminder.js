// import moment from 'moment';
// import Client from '../model/clientModel.js';
// import Todolist from '../model/TodoList.js';
// import { sendReminderEmail } from './emailUtils.js';

// const checkReminders = async () => {
//     try {
//         const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
//         const reminders = await Todolist.findAll({ where: { reminderTime: currentTime } })
//    console.log(currentTime);
//    console.log(reminders);
//         if (reminders.length === 0) {
//             console.log('No reminders found at this time.');
//         } else {
//             console.log(`Found ${reminders.length} reminders.`);
//         }      
//         for (const reminder of reminders) {
//             const { newTodo, category, deadline, reminderTime, client_Id_As_Foreignkey } = reminder;

//             const client = await Client.findByPk(client_Id_As_Foreignkey);
//             if (client && client.email) {
//                 const subject = `Reminder: ${category}`;
//                 const text = `This is a reminder for your to-do: "${newTodo}" which is due on ${deadline}.`;
//                 await sendReminderEmail(client.email, subject, text); 
//             }
//         }
//     } catch (error) {
//         console.error('Error checking reminders:', error);
//         throw new Error(`Error checking reminders: ${error.message}`);
//     }
// };

// // setInterval(checkReminders, 43200000);
// setInterval(checkReminders, 60000);


import moment from 'moment';
import Client from '../model/clientModel.js';
import Todolist from '../model/TodoList.js';
import { sendReminderEmail } from './emailUtils.js';

const checkReminders = async () => {
    try {
        const currentTime = moment();
        const startTime = currentTime.clone().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss');
        const endTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

        const reminders = await Todolist.findAll({ 
            where: {
                reminderTime: {
                    [Op.between]: [startTime, endTime]
                }
            }
        });

        console.log(`Checking reminders between ${startTime} and ${endTime}`);
        console.log(`Found ${reminders.length} reminders.`);

        if (reminders.length === 0) {
            console.log('No reminders found at this time.');
        } else {
            for (const reminder of reminders) {
                const { newTodo, category, deadline, reminderTime, client_Id_As_Foreignkey } = reminder;

                const client = await Client.findByPk(client_Id_As_Foreignkey);
                if (client && client.email) {
                    const subject = `Reminder: ${category}`;
                    const text = `This is a reminder for your to-do: "${newTodo}" which is due on ${deadline}.`;
                    await sendReminderEmail(client.email, subject, text);
                    console.log(`Sent reminder email to ${client.email}`);
                } else {
                    console.log(`No valid email found for client ID ${client_Id_As_Foreignkey}`);
                }
            }
        }
    } catch (error) {
        console.error('Error checking reminders:', error);
    }
};

// setInterval(checkReminders, 43200000);
setInterval(checkReminders, 60000);
