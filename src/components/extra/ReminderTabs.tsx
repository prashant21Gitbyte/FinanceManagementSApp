import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const CustomTabs = ({ tabs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setCurrentIndex(index);
    //console.log(index * width)
    Animated.spring(translateX, {
      toValue: -(index * width),
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const newIndex = Math.round(nativeEvent.translationX / width);
      setCurrentIndex(newIndex);
      Animated.spring(translateX, {
        toValue: newIndex * width,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, index === currentIndex && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, index === currentIndex && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <GestureHandlerRootView>

      
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.contentContainer, { transform: [{ translateX }] }]}>
          {tabs.map((tab, index) => (
            <View key={index} style={styles.screen}>
              {tab.component}
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: 'blue',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  screen: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabs;
