import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Client from '../model/clientModel.js';
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
const sendNotificationEmail = async (email, create_By_email, newTodo) => {
    const mailOptions = {
        // from: create_By_email,
        replyTo: create_By_email,
        to: email,
        subject: 'You have been assigned a new To-Do List',
        text: ` "${newTodo}". 
        Please check your dashboard for more details.`,
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




  /// New feature to register User

  const sendNotificationEmailAboutNewFeature = (email) => {
    const mailOptions = {
      from: 'maximnyansa75@gmail.com',
      to: email,
      subject: 'New Features Added to the Collaboration Platform',
      html: `
        <h2>Exciting News!</h2>
        <p>Dear user,</p>
        <p>We are thrilled to inform you that new features have been added to our collaboration platform:</p>
        <ul>
          <li>Real-time chatting with your team</li>
          <li>Task management – create, update, and track tasks</li>
          <li>Collaborate more efficiently with seamless updates</li>
        </ul>
        <p>Log in now to explore these new features and enhance your productivity!</p>
        <p>Best regards,<br>Your Collaboration Platform Team</p>
      `
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  // Function to notify all users
  const notifyAllUsers = async () => {
    try {
      // Fetch all users' emails
      const users = await Client.findAll({ attributes: ['email'] });
      
      // Send email to each user
      for (const user of users) {
        try {
          await sendNotificationEmailAboutNewFeature(user.email);
          console.log(`Email sent to ${user.email}`);
        } catch (err) {
          console.error(`Failed to send email to ${user.email}:`, err);
        }
      }
    } catch (error) {
      console.error('Error fetching users or sending emails:', error);
    }
  };
  
  // Call the function to send notifications
  notifyAllUsers();

export { sendNotificationEmail, sendReminderEmail,emailToRestPasswordLink };
