import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const sendNotificationEmail = async (email, newTodo) => {
    const mailOptions = {
        from: 'maximnyansa75@gmail.com',
        to: email,
        subject: 'You have been assigned a new To-Do List',
        text: `You have been assigned to the To-Do list titled "${newTodo}". Please check your dashboard for more details.`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error.message);
    }
};


const sendReminderEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'maximnyansa75@gmail.com',
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${to}`);
    } catch (error) {
        throw new Error(`Error sending email to ${to}: ${error.message}`);
    }
};

export { sendNotificationEmail, sendReminderEmail };
