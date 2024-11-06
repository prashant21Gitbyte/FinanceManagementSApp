import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Home from '../screens/Home';
import NavigationComponent from '../components/NavigationComponent';

import SplashScreen from '../screens/SplashScreen';

const MainNavigatior = () => {
  const [currentScreen, setCurrentScreen] = useState('SplashScreen');
  const [navigationValue, setNavigationValue] = useState('');

  const renderScreen = () => {
    switch (currentScreen) {
      //case 'CalenderTest':
      //return <CalenderTest2 />
      case 'SplashScreen':
        return (
          <SplashScreen
            onCompleteSplash={() => setCurrentScreen('NavigationComponent')}
          />
        );

      case 'NavigationComponent':
        return <NavigationComponent />;

      default:
        //return <TransactionsAllAccounts data={headerData} onPressReminder = {() =>  setCurrentScreen('Reminders')} />
        return <Text>hello</Text>;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>{renderScreen()}</View>
    </View>
  );
};

export default MainNavigatior;
