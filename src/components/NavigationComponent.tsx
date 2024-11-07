// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Button, View, Text, Image} from 'react-native';
import Home from '../screens/Home';
import AddExpenseScreen from '../screens/AddExpense';
import AddIncomeScreen from '../screens/AddIncome';
import TransactionsScreen from '../screens/Transactions';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

function DetailsScreen({navigation}) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Create the Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {
              backgroundColor: '#F6F6F6',
            },
          }}
          component={LoginScreen}
        />

        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {
              backgroundColor: '#F6F6F6',
            },
          }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: () => (
              <Image
                source={require('../resources/assets/images/crmLandingLogo.png')}
                style={{
                  width: 150,
                  height: 30,
                  resizeMode: 'cover',
                  marginTop: 10,
                }}
              />
            ),
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {
              backgroundColor: '#F6F6F6',
              height: 60,
            },
            headerLeft: () => null,
          }}
          component={Home}
        />
        <Stack.Screen
          name="AddExpense"
          options={{
            headerTitle: 'Add Expense',
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {
              backgroundColor: '#F6F6F6',
            },
          }}
          component={AddExpenseScreen}
        />
        <Stack.Screen
          name="AddIncome"
          options={{
            headerTitle: 'Add Income',
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {
              backgroundColor: '#F6F6F6',
            },
          }}
          component={AddIncomeScreen}
        />

        <Stack.Screen
          name="Transactions"
          options={{
            headerTitle: 'Transactions',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
          component={TransactionsScreen}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
