// Object to store active users and their socket IDs
const users = {};

// Add user to the active users list
export const addUser = (email, socketId) => {
  users[email] = socketId;
};

// Get user by email
export const getUserByEmail = (email) => {
  return users[email];
};

// Remove user from the active users list by their socket ID
export const removeUser = (socketId) => {
  for (const [email, id] of Object.entries(users)) {
    if (id === socketId) {
      delete users[email];
      break;
    }
  }
};

export default {
    removeUser, getUserByEmail, addUser
}