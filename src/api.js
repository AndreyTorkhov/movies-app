import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';

import {AuthContext} from './context/AuthContext.js';
import {API_URL} from './config.js';

export const useApi = () => {
  const {userToken} = useContext(AuthContext);
  const getMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          accept: '*/*',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  return {getMovies};
};
