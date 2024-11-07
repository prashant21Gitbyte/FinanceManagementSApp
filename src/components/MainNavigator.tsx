import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Home from '../screens/Home';
import NavigationComponent from '../components/NavigationComponent';
import {login, logout} from '../../features/userSlice';
import SplashScreen from '../screens/SplashScreen';
import {useSelector, useDispatch} from 'react-redux';

const MainNavigatior = () => {
  const [currentScreen, setCurrentScreen] = useState('SplashScreen');
  const [navigationValue, setNavigationValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login({name: 'John Doe', age: 30}));
    console.log(user);
  }, []);
  const user = useSelector(state => state.user);

  console.log(user);

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
