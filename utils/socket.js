
import Message  from '../model/message.js'; 
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
export const socketHandler = (io) => {
  const users = {}; // Store connected users by their email

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Store user's socket id by email when they join
    socket.on('joinChat', (email) => {
      users[email] = socket.id;
      console.log(`${email} joined the chat`);
    });

    // Handle live stream invite
    socket.on('inviteToStream', (data) => {
      const { fromEmail, toEmail } = data;
      const receiverSocketId = users[toEmail];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveInvite', { fromEmail });
        console.log(`Invitation sent from ${fromEmail} to ${toEmail}`);
      }
    });

    // Handle live stream acceptance
    socket.on('acceptInvite', (data) => {
      const { fromEmail, toEmail } = data;
      const senderSocketId = users[fromEmail];
      if (senderSocketId) {
        io.to(senderSocketId).emit('inviteAccepted', { toEmail });
        console.log(`${toEmail} accepted the invite from ${fromEmail}`);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      for (let email in users) {
        if (users[email] === socket.id) {
          delete users[email];
          break;
        }
      }
    });
  });
};

