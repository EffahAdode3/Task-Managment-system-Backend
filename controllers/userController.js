import { findUserByEmail, hashPassword, createUser, searchClientsByEmail, generateResetToken, updateClientResetToken } from '../services/userService.js';
import moment from 'moment';
import Client from '../model/clientModel.js';
import Todolist from '../model/TodoList.js';
import { sendReminderEmail, emailToRestPasswordLink  } from '../utils/emailUtils.js';

// sign up client 
const SignUpClient = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'exist' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser(userName, email, hashedPassword);
        if (newUser) {
            return res.status(201).json({ message: "Successful User" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};


const loginController = async (req, res) => {
    const token = req.token;
    const user = req.user;
    return res.status(200).json({ message: "Successful login", token, user });
};


const searchEmailController = async (req, res) => {
    try {
        const email = req.params.email;
        const users = await searchClientsByEmail(email);

        if (users.length > 0) {
            return res.status(200).json({
                message: "Success",
                users
            });
        } else {
            return res.status(404).json({
                message: "No users found"
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: error.message });
    }
};



const passwordRestLink = async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await findUserByEmail(email);
      if (!existingUser) {
        return res.status(404).json({ message: "Email not found" });
      }
  
      const resetToken = generateResetToken();
      const resetLinkFromFrontend = process.env.FORGETPASSWORDLINK;
      const resetLink = `${resetLinkFromFrontend}/${resetToken}`;
  
      await updateClientResetToken(email, resetToken);
  
    //   const mailOptions = createMailOptions(email, resetLink);
  
      await emailToRestPasswordLink(email, resetLink);
  
      return res.status(201).json({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

/// check Reminder 
const checkReminders = async () => {
    try {
        const currentTime = moment().format('YYYY-MM-DD');
        const reminders = await Todolist.findAll({ where: { reminderTime: currentTime } })
        console.log(currentTime);
        console.log(reminders);
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
                const text = `This is a reminder for your to-do: "${newTodo}" which is due on   ${ new Date(deadline).toDateString() }.`;      

                await sendReminderEmail(client.email, subject, text);
                console.log(client);
        
            }
    
        }
    } catch (error) {
        console.error('Error checking reminders:', error);
        throw new Error(`Error checking reminders: ${error.message}`);
    }
};

setInterval(checkReminders, 43200000);
// setInterval(checkReminders, 60000);


export default {SignUpClient, loginController, searchEmailController, passwordRestLink};




// const passwordRestLink = async(req, res) =>{
//     try {
//   const {email} = req.body;
//   const existing = await Client.findOne({where:{email}});
//   if(!existing){
//    return res.status(404).json({message:"Email not found"})
//   }else{
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     console.log(resetToken);
//     const resetLinkFromFrontend = process.env.FORGETPASSWORDLINK
//     await Client.update({
//       password: resetToken,},
//       { where: {email} }
//     )
//     var mailOptions = {
//       from: 'maximnyansa75@gmail.com',
//       to: email,
//       subject: 'Password Reset Email ',
//       html: `<p>
//       Please click the following link to reset your account's password: 
//       <br>
//       <a href="${resetLinkFromFrontend}/${resetToken}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">
//         Reset Password
//          </a>
//     </p>
//     <p>
//       If you simply ignore the link, you can not access your account!
//     </p>`
//     };
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         return res.status(500).json({message:error})
//       } else {
//         return res.status(201).json({message:"Email sent"})
//       }
//     });
//   }
  
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
//   }