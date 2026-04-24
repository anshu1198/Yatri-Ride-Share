import api from './api';

const messageService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  getMessages: async (otherUserId, rideId) => {
    const response = await api.get(`/messages/${otherUserId}/${rideId}`);
    return response.data;
  },

  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  }
};

export default messageService;
