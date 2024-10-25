
// import Message  from '../model/message.js'; 
// export const socketHandler = (io) => {
//   // Handle new socket connection
//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Join chat event when a user connects
//     socket.on('joinChat', (email) => {
//       console.log(`${email} joined the chat`);
//     });

//     // Handle sending messages
//     socket.on('sendMessage', async (data) => {
//       const { senderId, receiverId, message, fromEmail } = data;

//       // Save the message to the database
//       await Message.create({ senderId, receiverId, message });

//       // Emit the message to the receiver
//       io.emit('receiveMessage', { fromEmail, message });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
// };

import Message from '../model/message.js'; 

// Store connected users with their socket ids
const connectedUsers = {};

export const socketHandler = (io) => {
  // Handle new socket connection
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Track the user and their socket id when they join the chat
    socket.on('joinChat', (email) => {
      connectedUsers[email] = socket.id;  // Save the user's email and socket id
      console.log(`${email} joined the chat, socket ID: ${socket.id}`);
    });

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      const { senderId, receiverId, message, fromEmail } = data;

      // Save the message to the database
      await Message.create({ senderId, receiverId, message });

      // Get the socket id of the receiver
      const receiverSocketId = connectedUsers[receiverId];  // Assuming receiverId is the email

      if (receiverSocketId) {
        // Send the message only to the receiver
        io.to(receiverSocketId).emit('receiveMessage', { fromEmail, message });
        console.log(`Message sent to ${receiverId} with socket ID ${receiverSocketId}`);
      } else {
        console.log(`Receiver ${receiverId} not connected.`);
      }
    });

    // Handle disconnection and remove the user from the connected users list
    socket.on('disconnect', () => {
      for (let email in connectedUsers) {
        if (connectedUsers[email] === socket.id) {
          delete connectedUsers[email];
          console.log(`${email} disconnected`);
          break;
        }
      }
    });
  });
};
