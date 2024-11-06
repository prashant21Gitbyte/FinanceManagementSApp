import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const SplashScreen = ({ onCompleteSplash }) => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      onCompleteSplash()
      console.log('this is after 2 seconds')
    }, 2000); 

    
    return () => clearTimeout(timer);
  }, [onCompleteSplash]);

  return (
    <View style={styles.container}>
       <Image
        style={styles.image}
        source={require('../resources/assets/images/splashscreen4.gif')}
        resizeMode="contain"
      />
      {/*<Text>The app will load in a moment</Text>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 30
  },
  image: {
    width: 350, 
    height: 200, 
  },
});

export default SplashScreen;
