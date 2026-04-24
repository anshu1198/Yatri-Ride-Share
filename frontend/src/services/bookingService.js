import api from './api';

const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },

  getDriverBookings: async () => {
    const response = await api.get('/bookings/driver-requests');
    return response.data;
  },

  getRideBookings: async (rideId) => {
    const response = await api.get(`/bookings/ride/${rideId}`);
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },

  approveBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/approve`);
    return response.data;
  },

  rejectBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/reject`);
    return response.data;
  }
};

export default bookingService;
