import { findUserByEmail, hashPassword, createUser, searchClientsByEmail } from '../services/userService.js';

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


export default {SignUpClient, loginController, searchEmailController};
