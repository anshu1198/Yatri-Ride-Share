import api from './api';

const rideService = {
  getAllRides: async (params) => {
    const response = await api.get('/rides', { params });
    return response.data;
  },

  getRideById: async (id) => {
    const response = await api.get(`/rides/${id}`);
    return response.data;
  },

  createRide: async (rideData) => {
    const response = await api.post('/rides', rideData);
    return response.data;
  },

  updateRide: async (id, rideData) => {
    const response = await api.put(`/rides/${id}`, rideData);
    return response.data;
  },

  deleteRide: async (id) => {
    const response = await api.delete(`/rides/${id}`);
    return response.data;
  }
};

export default rideService;
