
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
      req.Client_email = verifiedToken.email;

      next();
  } catch (error     ) {
      console.error(error);
      return res.status(500).json({ message: "Error", error: error.message });
  }
};
export default {loginMiddleware, tokenVerification};


