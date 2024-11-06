import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home'
import BackupRestore from '../screens/BackupRestore';
import Help from '../screens/Help'
import Settings from '../screens/Settings'
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HeaderNavigation = ({ data, onPressReminder }) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('My Account 1')

  const toggleLeftDrawer = () => setIsLeftDrawerOpen(!isLeftDrawerOpen);
  const toggleRightDrawer = () => setIsRightDrawerOpen(!isRightDrawerOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleModalOptionClick = (screen) => {
    setSelectedScreen(screen);

    setIsModalOpen(false);
  };

  const handleDrawerOptionClick = (screen) => {
    setSelectedScreen(screen);
    /*
    if(screen === 'Home'){
       console.log('Home')
       
       
    }
    else if(screen === 'BackupRestore'){
        console.log('BackupRestore')
    }else if(screen === 'Help'){

        console.log('help')
    }else{
        console.log('home')
    }
        */
    //console.log(selectedScreen)
    setIsLeftDrawerOpen(false);
    setIsRightDrawerOpen(false);
    
  };
  const handleAccountOptionClick = (selection) => {
    setSelectedAccount(selection.label)
    setIsModalOpen(false)
  }




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
        console.log(selectedScreen)
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>Not implemented yet!</Text>
            </View>
        );
    }
  };

  return (
    <View style={{height: '100%'}}>
    <View style={styles.header}>
      {/*  Left Items render */}
      <View style={styles.leftItemsContainer}>
        {data.leftItems.map((item, index) => {
          if (item.type === 'menu') {
            return (
              <TouchableOpacity key={index} style={styles.leftIconContainer} onPress={toggleLeftDrawer}>
                <Ion name={item.icon} size={25} color="white" />
              </TouchableOpacity>
            );
          } else if (item.type === 'title') {
            return (
              <TouchableOpacity key={index} style={styles.titleContainer} onPress={toggleModal}>
                {/*<Text style={styles.title}>{item.text}</Text>*/}
                <Text style={styles.title}>{selectedAccount}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>

      {/*Right Items rendering*/}
      <View style={styles.rightItemsContainer}>
        <TouchableOpacity onPress={onPressReminder}>
            <Ion name="notifications" size={25} color="white"/>
        </TouchableOpacity>
        {data.rightItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.rightIconContainer} onPress={toggleRightDrawer}>
            <Ion name={item.icon} size={25} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Left Drawer Content */}
      <Modal visible={isLeftDrawerOpen} animationIn="slideInLeft" animationOut="slideOutRight">
        <View style={styles.drawer}>
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
          <TouchableOpacity style={styles.closeButton} onPress={toggleLeftDrawer}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Right Drawer Content */}
      <Modal visible={isRightDrawerOpen} animationIn="slideInLeft" animationOut="slideOutRight">
        <View style={styles.drawer}>
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
          <TouchableOpacity style={styles.closeButton} onPress={toggleRightDrawer}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for Account Options */}
      <Modal visible={isModalOpen} animationIn="slideInLeft" animationOut="slideOutRight">
        <View style={styles.modal}>
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
      </Modal>

      {/* Render the Screen that is selected */}
    </View>
    {<GestureHandlerRootView style={[{ flex: 1 } , styles.screenContainer]}><ScrollView>{renderScreen()}</ScrollView></GestureHandlerRootView>}

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
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  accountOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  accountOptionText: {
    fontSize: 18,
  },
  screenContainer: {
    flex: 1,
    //backgroundColor: 'yellow', 
    height: 500,
    padding: 2,
  },
});

export default HeaderNavigation;
