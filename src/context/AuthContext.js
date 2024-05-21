import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {email, password});
      const userInfo = response.data;
      const {accessToken, refreshToken} = userInfo;
      if (accessToken && refreshToken) {
        setUserInfo(userInfo);
        setUserToken(accessToken);

        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        console.log(response.data);
        console.log('UserToken: ' + accessToken);
      } else {
        throw new Error('Access token or refresh token not found in response');
      }
    } catch (error) {
      console.error(`Login error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/registration`, {
        email,
        password,
      });
      const {accessToken, refreshToken} = response.data;
      if (accessToken && refreshToken) {
        setUserToken(accessToken);

        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        console.log(response.data);
        console.log('UserToken: ' + accessToken);
      } else {
        throw new Error(
          'Registration error: access token or refresh token missing',
        );
      }
    } catch (error) {
      console.error(`Registration error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    setIsLoading(false);
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
        register,
        isLoading,
        userToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
