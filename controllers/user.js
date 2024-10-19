import Client from "../model/clientModel.js";
import Message from "../model/message.js";

// Object to store active users and their socket IDs
const users = {};

// Add user to the active users list
export const addUser = (email, socketId, userId) => {
  users[email] = { socketId, id: userId };  // Store both socketId and userId
};

// Get user by email and ID
export const getUserByEmail = (email, id) => {
  // Check if the user exists and if the ID matches
  if (users[email] && users[email].id === id) {
    return users[email].socketId;  // Return socketId
  }
  return null;  // Return null if not found
};

// Remove user from the active users list by their socket ID
export const removeUser = (socketId) => {
  for (const [email, { socketId: id }] of Object.entries(users)) {
    if (id === socketId) {
      delete users[email];
      break;
    }
  }
};

const createMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
      // Ensure sender and receiver exist
      const sender = await Client.findByPk(senderId);
      const receiver = await Client.findByPk(receiverId);

      if (!sender || !receiver) {
          return res.status(404).json({ error: 'Sender or Receiver not found' });
      }

      // Create a new message
      const newMessage = await Message.create({
          senderId,
          receiverId,
          message,
      });

      // Emit the message to the recipient
      const recipientSocket = getUserByEmail(receiverId); // Make sure to adjust this if needed
      if (recipientSocket) {
          io.to(recipientSocket).emit('receiveMessage', {
              fromEmail: sender.email,  // You may need to fetch the email based on senderId
              message: newMessage.message,
          });
      }

      res.status(201).json(newMessage);
  } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Failed to save message' });
  }
};


// Function to handle message creation






export default {
    removeUser, getUserByEmail, addUser, createMessage
}