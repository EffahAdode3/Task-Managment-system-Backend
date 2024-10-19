import Client from "../model/clientModel";
import Message from "../model/message";

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


// Function to handle message creation






export default {
    removeUser, getUserByEmail, addUser, createMessage
}