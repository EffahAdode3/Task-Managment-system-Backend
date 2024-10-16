import { addUser, getUserByEmail, removeUser } from '../controllers/user.js';

// Handles socket connection and events
export const handleSocketConnection = (io, socket) => {
  console.log(`A user connected: ${socket.id}`);

  // When a user joins with their email
  socket.on('joinChat', (userEmail) => {
    addUser(userEmail, socket.id);  // Add user to the active users list
    console.log(`${userEmail} joined the chat with socket ${socket.id}`);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ fromEmail, toEmail, message }) => {
    const recipientSocket = getUserByEmail(toEmail);  // Find recipient by email

    if (recipientSocket) {
      // Emit message to the recipient
      io.to(recipientSocket).emit('receiveMessage', {
        fromEmail,
        message,
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);  // Remove user when they disconnect
  });
};
