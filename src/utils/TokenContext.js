
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load token', error);
      }
    };

    loadToken();
  }, []);

  const saveToken = async (newToken) => {
    try {
      await AsyncStorage.setItem('access_token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Failed to save token', error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      
      setToken(null);
      console.log('token has been removed')
    } catch (error) {
      console.error('Failed to remove token', error);
    }
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => React.useContext(TokenContext);
