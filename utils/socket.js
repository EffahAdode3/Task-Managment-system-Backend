import { addUser, getUserByEmail, removeUser } from '../controllers/user.js';

// Handles socket connection and events
export const handleSocketConnection = (io, socket) => {
  console.log(`A user connected: ${socket.id}`);

  // When a user joins with their email and user ID
  socket.on('joinChat', ({ userEmail, userId }) => {
    addUser(userEmail, socket.id, userId);  // Add user to the active users list with ID
    console.log(`${userEmail} joined the chat with socket ${socket.id}`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ fromEmail, toEmail, message, userId }) => {
    const recipientSocket = getUserByEmail(toEmail, userId);  // Find recipient by email and ID

    if (recipientSocket) {
      // Emit message to the recipient
      io.to(recipientSocket).emit('receiveMessage', {
        fromEmail,
        message,
      });
    } else {
      console.log(`User with email ${toEmail} not found.`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);  // Remove user when they disconnect
  });
};
