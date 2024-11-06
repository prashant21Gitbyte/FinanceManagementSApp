// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Button, View, Text} from 'react-native';
import Home from '../screens/Home';
import AddExpenseScreen from '../screens/AddExpense';
import AddIncomeScreen from '../screens/AddIncome';
import TransactionsScreen from '../screens/Transactions';

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: 'CRM Finance',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
          component={Home}
        />
        <Stack.Screen
          name="AddExpense"
          options={{
            headerTitle: 'CRM Finance',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
          component={AddExpenseScreen}
        />
        <Stack.Screen
          name="AddIncome"
          options={{
            headerTitle: 'CRM Finance',
            headerTitleStyle: {fontWeight: 'bold'},
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
