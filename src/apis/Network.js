import axios from 'axios';
import {API_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// Request interceptor to add the authorization token to headers
api.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await axios.get(`${API_URL}/refresh`, {
      headers: {Authorization: `Bearer ${refreshToken}`},
    });
    const {accessToken} = response.data;
    await AsyncStorage.setItem('userToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token error: ', error);
    throw error;
  }
};

// Response interceptor to handle token refreshing
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
