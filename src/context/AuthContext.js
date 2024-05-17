import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}login`, {
        email,
        password,
      })
      .then(response => {
        let userInfo = response.data;
        const {accessToken} = userInfo;
        if (accessToken) {
          setUserInfo(userInfo);
          setUserToken(accessToken);

          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userToken', accessToken);

          console.log(response.data);
          console.log('UserToken: ' + accessToken);
        } else {
          console.error('Access token not found in response');
          throw new Error('Access token not found in response');
        }
      })
      .catch(e => {
        console.error(`Login error ${e}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}registration`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Server Response:', response.data);
      const {accessToken} = response.data;
      if (accessToken) {
        setUserToken(accessToken);
        AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
        AsyncStorage.setItem('userToken', accessToken);
        console.log(response.data);
        console.log('UserToken' + accessToken);
        setIsLoading(false);
        return; // Успешная регистрация
      } else {
        // Handle case where accessToken is missing
        console.error('Registration error: accessToken missing');
        throw 'Registration error: accessToken missing';
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(`Registration error: ${error.response.status}`);
        throw error.response.data.error || 'Registration error';
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        throw 'No response received from server';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw 'Error setting up request';
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get(`${API_URL}refresh`, {
        headers: {Authorization: `Bearer ${refreshToken}`},
      });
      const {accessToken} = response.data;

      AsyncStorage.setItem('userToken', accessToken);
      setUserToken(accessToken);

      console.log('Token refreshed: ', accessToken);
    } catch (error) {
      console.error('Refresh token error: ', error);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setUserToken(userToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Check login error: ', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        refreshAccessToken,
        register,
        isLoading,
        userToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
