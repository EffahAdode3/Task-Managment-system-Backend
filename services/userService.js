import Client from "../model/clientModel.js";
import bcryptjs from "bcryptjs";
// find user By Email
export const findUserByEmail = async (email) => {
    try {
        return await Client.findOne({ where: { email } });
    } catch (error) {
        throw new Error('Error checking for existing user');
    }
};

// Hash Password
export const hashPassword = async (password) => {
    try {
        return await bcryptjs.hash(password, 8);
    } catch (error) {
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
        throw new Error('Error creating user');
    }
};


export const getUserById = async (clientId) => {
    try {
        return await Client.findByPk(clientId);
    } catch (error) {
        throw new Error('Error finding user');
    }
};


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
        throw new Error('Error searching clients by email');
    }
};

export const findUsersByEmails = async (emails) => {
    try {
        return await Client.findAll({ where: { email: emails } });
    } catch (error) {
        throw new Error('Error finding users by emails');
    }
};


export default { searchClientsByEmail, findUsersByEmails, getUserById}