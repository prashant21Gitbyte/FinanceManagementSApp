import React from 'react';
import {Text, View} from 'react-native';
import Home from './src/screens/Home';
import About from './src/screens/About';
//import NavigationScreen from './src/screens/Navigation'
import HeaderNavigation from './src/components/HeaderNavigation';
import headerData from './src/resources/NavigationComp.json';
import MainNavigator from './src/components/MainNavigator';

import {Provider} from 'react-redux';
import Store from './Store';

const App = () => {
  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
