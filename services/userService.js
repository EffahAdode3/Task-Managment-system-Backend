import Client from "../model/clientModel.js";
import bcryptjs from "bcryptjs";
import { Op } from "sequelize";
import crypto from 'crypto'
// find user By Email
export const findUserByEmail = async (email) => {
    try {
        return await Client.findOne({ where: { email } });
    } catch (error) {
        console.error('Error checking for existing user', error);
        throw new Error('Error checking for existing user');
    }
};

// Hash Password
export const hashPassword = async (password) => {
    try {
        return await bcryptjs.hash(password, 8);
    } catch (error) {
        console.error('Error hashing password', error);
        throw new Error('Error hashing password');
    }
};

// Create User
export const createUser = async (userName, email, hashedPassword) => {
    try {
        return await Client.create({
            userName,
            email,
            password: hashedPassword,
        });
    } catch (error) {
         console.error('Error creating user', error);
        throw new Error('Error creating user');
    }
};

// Get User by Id
export const getUserById = async (clientId) => {
    try {
        return await Client.findByPk(clientId);
    } catch (error) {
        console.error('Error finding user', error);
        throw new Error('Error finding user');
    }
};

// search User By Email
export const searchClientsByEmail = async (email) => {
    try {
        return await Client.findAll({
            where: {
                email: {
                    [Op.like]: `%${email}%`
                }
            }
        });
    } catch (error) {
        console.error('Error searching clients by email:', error);
        throw new Error('Error searching clients by email');
    }
};
 

// Find Users By Emails 
export const findUsersByEmails = async (emails) => {
    try {
        return await Client.findAll({ where: { email: emails } });
    } catch (error) {
        console.error('Error finding users by emails', error);
        throw new Error('Error finding users by emails');
        
    }
};

export const generateResetToken = () => {   
    try {
        return crypto.randomBytes(20).toString('hex');
    } catch (error) {
        console.error('Error creating Crypto', error);
        throw new Error('Error creating Crypto');
    }
};
  

export const updateClientResetToken = async (email, resetToken) => {
    try {
        await Client.update({ password: resetToken }, { where: { email } });
    } catch (error) {
        console.error('Error update client Reset token', error);
        throw new Error('Error update client Reset token');
    }
};
   

export default { searchClientsByEmail, findUsersByEmails,
     getUserById, generateResetToken, updateClientResetToken}