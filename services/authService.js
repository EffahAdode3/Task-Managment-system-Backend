
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.ACCESS_TOKEN;

const verifyPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password', error);
        throw new Error('Error verifying password');
    }
};

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        userName: user.userName,
    };
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};


const extractTokenFromHeader = (authorizationHeader) => {
    if (!authorizationHeader) return null;
    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
};

const decodeToken = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (error) {
          console.error('Invalid token format', error);
        throw new Error('Invalid token format');
    }
};

const isTokenExpired = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.payload.exp <= currentTime;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Invalid token', error);
        throw new Error('Invalid token');
    }
};



export {  verifyPassword, generateToken,  
    extractTokenFromHeader, decodeToken, 
    isTokenExpired, verifyToken  };
