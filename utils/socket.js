
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
  const users = {};

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChat', (email) => {
      console.log(`${email} joined the chat`);
      users[email] = socket.id;
    });

    // Notify when a user starts a live stream
    socket.on('startStream', (fromEmail) => {
      console.log(`${fromEmail} started a live stream`);

      // Notify all connected users except the streamer that a live stream is available
      socket.broadcast.emit('streamAvailable', { fromEmail });
    });

    // Handle WebRTC signaling
    socket.on('offer', (data) => {
      const { offer, toEmail, fromEmail } = data;
      const receiverSocketId = users[toEmail];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('offer', { offer, fromEmail });
      }
    });

    socket.on('answer', (data) => {
      const { answer, toEmail, fromEmail } = data;
      const receiverSocketId = users[toEmail];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('answer', { answer, fromEmail });
      }
    });

    socket.on('candidate', (data) => {
      const { candidate, toEmail, fromEmail } = data;
      const receiverSocketId = users[toEmail];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('candidate', { candidate, fromEmail });
      }
    });

    // Remove disconnected users
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
