import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  PanResponder,
  Dimensions
} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import BackupRestore from '../screens/BackupRestore';
import Help from '../screens/Help';
import Settings from '../screens/Settings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

const HeaderNavigation = ({ data, onPressReminder }) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('My Account 1');

  const leftDrawerAnim = useRef(new Animated.Value(-screenWidth)).current;
  const rightDrawerAnim = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(leftDrawerAnim, {
      toValue: isLeftDrawerOpen ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isLeftDrawerOpen]);

  useEffect(() => {
    Animated.timing(rightDrawerAnim, {
      toValue: isRightDrawerOpen ? 0 : screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isRightDrawerOpen]);

  const panResponderLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          leftDrawerAnim.setValue(Math.min(0, gestureState.dx - screenWidth));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          setIsLeftDrawerOpen(true);
        } else {
          setIsLeftDrawerOpen(false);
        }
      },
    })
  ).current;

  const panResponderRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          rightDrawerAnim.setValue(Math.max(0, gestureState.dx + screenWidth));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          setIsRightDrawerOpen(true);
        } else {
          setIsRightDrawerOpen(false);
        }
      },
    })
  ).current;

  const handleDrawerOptionClick = (screen) => {
    setSelectedScreen(screen);
    setIsLeftDrawerOpen(false);
    setIsRightDrawerOpen(false);
  };

  const handleAccountOptionClick = (selection) => {
    setSelectedAccount(selection.label);
    setIsLeftDrawerOpen(false);
    setIsRightDrawerOpen(false);
  };

  const renderScreen = () => {
    switch (selectedScreen) {
      case 'Home':
        return <Home />;
      case 'BackupRestore':
        return <BackupRestore />;
      case 'Help':
        return <Help />;
      case 'Settings':
        return <Settings />;
      default:
        return (
          <View style={styles.centered}>
            <Text style={styles.notImplemented}>Not implemented yet!</Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* Left Items render */}
        <View style={styles.leftItemsContainer}>
          {data.leftItems.map((item, index) => {
            if (item.type === 'menu') {
              return (
                <TouchableOpacity key={index} style={styles.leftIconContainer} onPress={() => setIsLeftDrawerOpen(true)}>
                  <Ion name={item.icon} size={25} color="white" />
                </TouchableOpacity>
              );
            } else if (item.type === 'title') {
              return (
                <TouchableOpacity key={index} style={styles.titleContainer} onPress={() => setIsRightDrawerOpen(true)}>
                  <Text style={styles.title}>{selectedAccount}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>

        {/* Right Items rendering */}
        <View style={styles.rightItemsContainer}>
          <TouchableOpacity onPress={onPressReminder}>
            <Ion name="notifications" size={25} color="white" />
          </TouchableOpacity>
          {data.rightItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.rightIconContainer} onPress={() => setIsRightDrawerOpen(true)}>
              <Ion name={item.icon} size={25} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Render the Screen that is selected */}
      <GestureHandlerRootView style={styles.screenContainer}>
        <ScrollView>{renderScreen()}</ScrollView>
      </GestureHandlerRootView>

      {/* Left Drawer Content */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: leftDrawerAnim }] }]}
        {...panResponderLeft.panHandlers}
      >
        {data.leftItems.map((item, index) => {
          if (item.type === 'menu' && item.drawerOptions) {
            return item.drawerOptions.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.drawerItem}
                onPress={() => handleDrawerOptionClick(option.screen)}
              >
                <Ion name={item.icon} size={25} color="black" />
                <Text style={styles.drawerItemText}>{option.label}</Text>
              </TouchableOpacity>
            ));
          }
        })}
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsLeftDrawerOpen(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Right Drawer Content */}
      <Animated.View
        style={[styles.drawer, styles.rightDrawer, { transform: [{ translateX: rightDrawerAnim }] }]}
        {...panResponderRight.panHandlers}
      >
        {data.rightItems.map((item, index) => {
          if (item.type === 'menu' && item.drawerOptions) {
            return item.drawerOptions.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.drawerItem}
                onPress={() => handleDrawerOptionClick(option.screen)}
              >
                <Ion name={item.icon} size={25} color="black" />
                <Text style={styles.drawerItemText}>{option.label}</Text>
              </TouchableOpacity>
            ));
          }
        })}
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsRightDrawerOpen(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0288D1',
    height: 60,
    paddingHorizontal: 10,
  },
  leftItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginRight: 10,
  },
  titleContainer: {
    marginRight: 'auto',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  rightIconContainer: {
    marginLeft: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  rightDrawer: {
    right: 0,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  screenContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notImplemented: {
    fontSize: 20,
  },
});

export default HeaderNavigation;
