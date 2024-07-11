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
        console.error('Error sending email to:', error);
        throw new Error(`Error sending email to ${to}: ${error.message}`);
    }
};


const emailToRestPasswordLink = async (email, resetLink) => {
    const mailOptions = {
      from: 'maximnyansa75@gmail.com',
      to: email,
      subject: 'Password Reset Email',
      html: `
        <p>
          Please click the following link to reset your account's password: 
          <br>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>
          If you simply ignore the link, you cannot access your account!
        </p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error.message);  
    }
  };

export { sendNotificationEmail, sendReminderEmail,emailToRestPasswordLink };
