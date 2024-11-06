import * as React  from 'react';

import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
  import {useState} from 'react'
  import Settings from './Settings'
import BackupRestore from './BackupRestore';
import Ion from 'react-native-vector-icons/Ionicons'
import Home from './Home';
import Help from './Help'  



function CustomDrawerContent(props) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState(null);



    
const accountOptions = [
    { id: 1, name: 'Account 1' },
    { id: 2, name: 'Account 2' },
    { id: 3, name: 'Account 3' },
  ];


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
    
    setModalVisible(false);
  };

    return (
      <DrawerContentScrollView style={{marginTop: -5, padding: 0, backgroundColor: 'white', gap:0}} {...props}>
        
        <View style={styles.drawerCard}>
            <TouchableOpacity onPress={openModal}>
            <Ion name='repeat' size={40} style={{}} color='white'/>
            </TouchableOpacity>
            
            <Text style={styles.logoText}>Income Expense</Text>
        </View>
        <DrawerItemList {...props} />
        {/*<DrawerItem label="Help" onPress={() => alert('Link to help')} />*/}


        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select an Account</Text>
            {accountOptions.map(account => (
              <TouchableOpacity
                key={account.id}
                style={styles.modalOption}
                onPress={() => handleAccountSelection(account)}
              >
                <Text>{account.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      </DrawerContentScrollView>
    );
  }
function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon }) => (
    <View style={styles.drawerItem, {backgroundColor: 'red'}}>
      <Ion name={icon} size={20} style={styles.drawerIcon} />
      <Text style={styles.drawerLabel}>{label}</Text>
    </View>
  );

function MyDrawer() {

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(null)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }
    const handleAccountSelection = (account) => {
        setSelectedAccount(account)
        setModalVisible(false)
    }

    
  
    return (

    
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        {/*<Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: () => <CustomDrawerItem label="Home" icon="rocket" />,
        }}
      />*/}

      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Backup and Restore" component={BackupRestore} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
}

export default function NavigationScreen() {

    
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}


const styles= StyleSheet.create({
    drawerCard:{
        
        width: '100%',
        height: 150,
        backgroundColor: '#03A9F5',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300
      },
      modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center'
      },
      modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center'
      },
      closeButton: {
        marginTop: 10,
        backgroundColor: '#f2f2f2',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 9,


      },


      drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
      },
      drawerIcon: {
        marginRight: 10,
      },
      drawerLabel: {
        fontSize: 16,
      },
    
})
