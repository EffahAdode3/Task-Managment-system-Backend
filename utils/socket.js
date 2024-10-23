
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

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a chat room
    socket.on('joinChat', (email) => {
      socket.join(email);
      console.log(`${email} joined the chat room.`);
    });

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      const newMessage = new Message({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });

      // Save the message to the database
      await newMessage.save();

      // Emit the message to the recipient
      socket.to(data.receiverId).emit('receiveMessage', {
        fromEmail: data.fromEmail,
        message: data.message,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
