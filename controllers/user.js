import Message from "../model/message.js";
  
  const fetchMessage = async (req, res) => {
  const { userId, chatPartnerId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        senderId: [userId, chatPartnerId],
        receiverId: [userId, chatPartnerId],
      },
      order: [['createdAt', 'ASC']],
    });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
}
export default {fetchMessage }