
// import Client from '../model/clientModel.js'
// import  jwt  from "jsonwebtoken";
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// dotenv.config();
// const secret = process.env.ACCESS_TOKEN;

// // for login
// const generateToken = async(req, res, next) =>{
//     try {
//   const {email, password} = req.body;
//   const findClient = await Client.findOne({where:{email}});
//   if(!findClient){
//     return res.status(401).json({message:"Invalid Email "});
//   } 
//   const passwordMatch = await bcrypt.compare(
//     password, findClient.password
//  )
//  if(!passwordMatch){
//     res.status(401).json({message:"Invalid Password"});
//     return;
//  }
//  const generatetoken = {
//     id:findClient.id,
//     email:findClient.email,
//     userName:findClient.userName,   
//  }
// const ClientToken = jwt.sign(generatetoken, secret, { expiresIn: "120s" });
//  req.token = ClientToken
//  req.user = findClient;

//  next()
// } catch (error) {
//     console.log(error);
//     res.status(500).json({message:"Unable to login", error})
//     return;   
// }
// }

import { verifyPassword, generateToken } from '../services/authService.js';
import { extractTokenFromHeader, decodeToken, isTokenExpired, verifyToken } from '../services/authService.js';
import { findUserByEmail } from '../services/userService.js';

const loginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = generateToken(user);
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to login", error: error.message });
    }
};


const tokenVerification = async (req, res, next) => {
  try {
      const tokenInHeader = extractTokenFromHeader(req.headers.authorization);
      if (!tokenInHeader) {
          return res.status(401).json({ message: "No token provided" });
      }

      const decodedToken = decodeToken(tokenInHeader);
      if (!decodedToken || !decodedToken.payload) {
          return res.status(401).json({ message: "Invalid token format" });
      }

      if (isTokenExpired(decodedToken)) {
          return res.status(401).json({ message: "Token has expired" });
      }

      const verifiedToken = verifyToken(tokenInHeader);
      req.Client_id = verifiedToken.id;

      next();
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error", error: error.message });
  }
};



export default {loginMiddleware, tokenVerification};


// token Verification
// const tokenVerification = async (req, res, next) => {
//     try {
//       const tokenInHeader =  req.headers.authorization?.split(' ')[1];
//       if (!tokenInHeader) {
      
//         return res.status(401).json({ message: "No token provided" });
//       }
//       const decodedToken = jwt.decode(tokenInHeader, { complete: true });
//       if (!decodedToken || !decodedToken.payload) {
          
//         return res.status(401).json({ message: "Invalid token format" });
//       }
  
//       const currentTime = Math.floor(Date.now() / 1000);
//       if (decodedToken.payload.exp <= currentTime) {
//         return res.status(401).json({ message: "Token has expired" });
//       }
  
//       const verify = jwt.verify(tokenInHeader, secret);
//       req.Client_id = verify.id;
//       // console.log(verify);
//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Error", error });
//     }
//   };
// export default {loginMiddleware, tokenVerification }