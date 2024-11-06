import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Image
  
} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import BackupRestore from '../screens/BackupRestore';
import Help from '../screens/Help';
import Settings from '../screens/Settings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Account from '../screens/Account'
import PaymentMethodChart from '../screens/PaymentMethodChart2';
import { BottomSheetSlideOutSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import AccountSummary from '../screens/AccountSummary'
import LoginScreen from '../screens/LoginScreen'
import { useToken } from '../utils/TokenContext';

const { width: screenWidth } = Dimensions.get('window');

const HeaderNavigation = ({ data, onPressReminder, onPressEdit, onPressAddHeader, onPressTransactions, onPressPaymentMethodChart, onPressCategoryChart, onPressSummary, onPressTransactionsAllAccounts, onPressAccount, onPressHelp, onPressPaymentMethod, onPressCategoryAdd, onPressTransfer, onPressLogout, onPressTransactionDetail}) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [selectedAccount, setSelectedAccount] = useState('My Account 1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leftDrawerAnim = useRef(new Animated.Value(-screenWidth)).current;
  const rightDrawerAnim = useRef(new Animated.Value(screenWidth)).current;
  const {removeToken} = useToken()
  const toggleModal = () => setIsModalOpen(!isModalOpen);



  const handleEdit = () => {
   
    onPressEdit()
  }
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

  const handleDrawerOptionClick = async (screen) => {
    if(screen === 'Logout'){
      await removeToken()
      return onPressLogout()

    }
    setSelectedScreen(screen);
    setIsLeftDrawerOpen(false);
    setIsRightDrawerOpen(false);
  };

  const handleRightDrawerOptionClick = (optionTouched) => {
    console.log(optionTouched)
    switch (optionTouched){
      case 'PaymentMethodChart':
        return onPressPaymentMethodChart()
      case 'CategoryChart':
        return onPressCategoryChart()  
      case 'Reminders':
        return onPressReminder()
      case 'AccountSummary':
        console.log("reched in right menu")
        setSelectedScreen('AccountSummary')
        return renderScreen()

      case 'Summary':
          //console.log("reched in right menu")
          //setSelectedScreen('Summary')
          return onPressSummary()  

      case 'TransactionsAllAccounts':
            //console.log("reched in right menu")
            //setSelectedScreen('Summary')
            return onPressTransactionsAllAccounts() 
            
            
      case 'Account':
              //console.log("reched in right menu")
              //setSelectedScreen('Summary')
              return onPressAccount()       
      case 'Help':
        return onPressHelp()
      case 'PaymentMethod':
        return onPressPaymentMethod()

      case 'CategoryAdd':
          return onPressCategoryAdd()

    }
  }

  const handleAccountOptionClick = (selection) => {
    setSelectedAccount(selection.label);
    setIsModalOpen(false)
    setIsLeftDrawerOpen(false);
    setIsRightDrawerOpen(false);
  };

  const handleTouchOutside = () => {
    if (isLeftDrawerOpen) {
      setIsLeftDrawerOpen(false);
    }
    if (isRightDrawerOpen) {
      setIsRightDrawerOpen(false);
    }
  };

  
  const renderScreen = () => {
    
    switch (selectedScreen) {
      case 'Home':
        return <Home onPressAddHeader={onPressAddHeader} onPressTransactions={onPressTransactions} onPressTransactionDetail = {onPressTransactionDetail} onPressTransfer={onPressTransfer}/>;
      case 'BackupRestore':
        return <BackupRestore />;
      case 'Help':
        return onPressHelp()
      case 'Settings':
        return <Settings />;
      case 'Logout':
          return onPressLogout();

      case 'account':
        return <Account />;
      case 'PaymentMethodChart':
         return onPressPaymentMethodChart()
      case 'CategoryChart':
          return onPressCategoryChart() 
      case 'AccountSummary':
          
          return <AccountSummary />     
        
      
      

      
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
            //console.log(index)
            if (item.type === 'menu') {
              return (
                <TouchableOpacity key={`left-${index}`} style={styles.leftIconContainer} onPress={() => setIsLeftDrawerOpen(true)}>
                  {/*<Ion name={item.icon} size={29} color="white" />*/}
                  {false ? <Image
                    source={require('../resources/assets/images/crmLandingLogo.png')}
                    style={styles.image}
                  /> : <Text style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>CM</Text>}
                  
                </TouchableOpacity>
              );
            } else if (item.type === 'title') {
              return (
                <View key={`left-${index}`}>
                  <Text style={styles.title}>Hello! CRM</Text>

                      {/*
                  <TouchableOpacity key={index} style={styles.titleContainer} onPress={toggleModal}>
                  <Text style={styles.title}>{selectedAccount}</Text>
                  <Ion name="chevron-down-sharp" color="white" size={19} style={{marginTop: 2}} />
                </TouchableOpacity>
                  
                  
                  */}
                  </View>
                
                
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
      <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <GestureHandlerRootView style={styles.screenContainer}>
      
        <View style={{ height: '100%'}}>{renderScreen()}</View>
        { /*isLeftDrawerOpen || isRightDrawerOpen ? <View style={{ backgroundColor:'transparent', width: '100%', height: '100%'}}></View> : <View /> */ }
      </GestureHandlerRootView>
      </TouchableWithoutFeedback>




        {/* Modal for Account Options */}
        
      <Modal transparent={true} visible={isModalOpen} animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor:"transparent", width: '100%', borderBottomWidth: .2}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6}}>
            <Ion name="wallet-outline" color="#2E79D8" size={30}></Ion>
            <Text style={{fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', paddingVertical: 15}}>Account</Text>
            
            </View>
          
          <TouchableOpacity onPress={handleEdit}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 0, paddingHorizontal: 9, backgroundColor: '#B9DEE2', borderRadius: 7, height: 35}}>
            <Ion name="pencil" size={20} color="#2E79D8"></Ion>
            <Text style={{fontSize: 16, color: '#2E79D8'}}>Edit</Text>
          </View>
          </TouchableOpacity>
          
          </View>
          {data.leftItems.map((item, index) => {
            if (item.type === 'title' && item.modalOptions) {
              return item.modalOptions.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.accountOption}
                  //onPress={() => handleModalOptionClick(option.screen)}
                  onPress={() => handleAccountOptionClick(option)}
                >
                  <Text style={styles.accountOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ));
            }
          })}
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
      







      {/* Left Drawer Content */}
      
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: leftDrawerAnim }] }]}
        {...panResponderLeft.panHandlers}

      >
        <View style={styles.drawerBanner}>
          <Ion name="repeat" size={50} color="white"/>
          <Text style={{color:"white", fontWeight: 'bold', fontSize: 20}}>Income Expense</Text>
        </View>


        <View style={{padding: 20}}>
        {data.leftItems.map((item, index) => {
          if (item.type === 'menu' && item.drawerOptions) {
            return item.drawerOptions.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.drawerItem}
                onPress={() => handleDrawerOptionClick(option.screen)}
              >
                <Ion name={option.icon} size={25} color="black" />
                <Text style={styles.drawerItemText}>{option.label}</Text>
              </TouchableOpacity>
            ));
          }
        })}
        </View>
        {/*
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsLeftDrawerOpen(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        */}
        
      </Animated.View>

      {/* Right Drawer Content */}
      <Animated.View
        style={[styles.drawer, styles.rightDrawer, { transform: [{ translateX: rightDrawerAnim }] }]}
        {...panResponderRight.panHandlers}
      >

        <View style={styles.drawerBanner}>
          <Ion name="repeat" size={50} color="white"/>
          <Text style={{color:"white", fontWeight: 'bold', fontSize: 20}}>Income Expense</Text>
        </View>
        <ScrollView style={{padding: 20}}>
        {data.rightItems.map((item, index) => {
          if (item.type === 'menu' && item.drawerOptions) {
            return item.drawerOptions.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.drawerItem}
                onPress={() => {handleRightDrawerOptionClick(option.screen), setIsRightDrawerOpen(false)}}
              >
                <Ion name={option.icon} size={25} color="black" />
                <Text style={styles.drawerItemText}>{option.label}</Text>
              </TouchableOpacity>
            ));
          }
        })}
        </ScrollView>
        {/**
         <TouchableOpacity style={styles.closeButton} onPress={() => setIsRightDrawerOpen(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
         */}
        
      </Animated.View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  drawerBanner:{
    backgroundColor: '#03A9F5',
    height: 160,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03A9F4',
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
    flexDirection:'row'
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
    elevation: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 270,
    backgroundColor: '#fff',
    //paddingTop: 60,
    //paddingHorizontal: 20,
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
  modalContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modal: {
    backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 10,
      minWidth: 300,


    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    
    borderWidth: .4,
    
    margin: 'auto',
   

   
    paddingHorizontal: 20,
  },
  accountOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'start',
  },
  accountOptionText: {
    fontSize: 18,
  },
});

export default HeaderNavigation;
