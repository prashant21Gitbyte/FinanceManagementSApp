// src/LoginScreen.js
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState} from 'react';
import { View, StyleSheet , Text, Image} from 'react-native';
import { Button } from 'react-native-paper';
import {TextInput} from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native';
import { useToken } from '../utils/TokenContext';


const LoginScreen = ({onPressLogin}) => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {token, saveToken, removeToken} = useToken()


  useEffect(() => {
    console.log(token)
  }, [token])
  const handleLogin = async () => {
    
    try{
      
      const newToken = 'mockAccessToken2';
      await saveToken(newToken);
      
      return onPressLogin()
      
      
     
    }catch(error){
      Alert.alert('ERROR', 'Invalid');

      console.error('login failed::', error.toString())
    }
    
    
    
  };

  return (
    <View style={styles.container}>
        
        <Image
        source={require('../resources/assets/images/crmLandingLogo.png')}
        style={styles.image}
      />
      
      {/*<Ion name="person-circle" size={90} color='black'/>*/}
        {/*<Text style={styles.headStyle}>Welcome Back</Text>*/}
      
      <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
      />
      </View>
      <View>

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Password"
      />
      </View>
      
      <Button mode="contained" buttonColor="#0D89C8" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({

    image: {
        width: 220,
        height: 140,
        resizeMode: 'contain', // Adjust as needed
      },
    headStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    
    borderRadius: 10, 
    width: 330,
   
    marginBottom: 10,

  },
  button: {
    width: '96%',
    marginTop: 10,
  },
});

export default LoginScreen;
