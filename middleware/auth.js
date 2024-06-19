
import Client from '../model/clientModel.js'
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.ACCESS_TOKEN;

// for login
const generateToken = async(req, res, next) =>{
    try {
  const {email, password} = req.body;
  const findClient = await Client.findOne({where:{email}});
  if(!findClient){
    return res.status(401).json({message:"Invalid Email "});
  } 
  const passwordMatch = await bcrypt.compare(
    password, findClient.password
 )
 if(!passwordMatch){
    res.status(401).json({message:"Invalid Password"});
    return;
 }
 const generatetoken = {
    id:findClient.id,
    email:findClient.email,
    userName:findClient.userName,   
 }
const ClientToken = jwt.sign(generatetoken, secret, { expiresIn: "120s" });
 req.token = ClientToken
 req.user = findClient;

 next()
} catch (error) {
    console.log(error);
    res.status(500).json({message:"Unable to login", error})
    return;   
}
}
// token Verification
const tokenVerification = async (req, res, next) => {
    try {
      const tokenInHeader =  req.headers.authorization?.split(' ')[1];
      if (!tokenInHeader) {
      
        return res.status(401).json({ message: "No token provided" });
      }
      const decodedToken = jwt.decode(tokenInHeader, { complete: true });
      if (!decodedToken || !decodedToken.payload) {
          
        return res.status(401).json({ message: "Invalid token format" });
      }
  
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.payload.exp <= currentTime) {
        return res.status(401).json({ message: "Token has expired" });
      }
  
      const verify = jwt.verify(tokenInHeader, secret);
      req.Client_id = verify.id;
      // console.log(verify);
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error", error });
    }
  };
export default {generateToken, tokenVerification }