const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, rideId, content } = req.body;
    const senderId = req.user.id;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      ride: rideId,
      content
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages between two users for a specific ride
exports.getMessages = async (req, res) => {
  try {
    const { otherUserId, rideId } = req.params;
    const userId = req.user.id;

    const messages = await Message.find({
      ride: rideId,
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all conversations for a user
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    // This is a simplified version. Usually, you'd aggregate to get unique conversations.
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
    .populate('sender', 'name')
    .populate('receiver', 'name')
    .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
