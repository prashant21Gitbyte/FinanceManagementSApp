// src/LoginScreen.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    try {
      const newToken = 'mockAccessToken2';

      console.log('login clicked', email, password);
    } catch (error) {
      Alert.alert('ERROR', 'Invalid');

      console.error('login failed::', error.toString());
    }
  };

  const goToSignUp = () => {
    navigation.navigate('Login');
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
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
        />
      </View>

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

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already registered? </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.registerLink}>Login</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        buttonColor="#0D89C8"
        onPress={handleSignUp}
        style={styles.button}>
        Sign Up
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
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  footer: {
    //position: 'absolute',
    //bottom: 20,
    //left: 0,
    //right: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
