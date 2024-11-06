import react, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import CustomTabs from '../components/ReminderTabs';


let accountsDemo = [{accountId: 1, accountLabel: "Account 1"}, {accountId: 2, accountLabel: "Account 2"}]



const Account = ({onPressBack}) => {
const [showAccountModal, setShowAccountModal] = useState(false);

  
const [inputValue, setInputValue] = useState('');


const [editingAccount, setEditingAccount] = useState(null); 
const [selectedAccount, setSelectedAccount] = useState(null); 


const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      
      return;
    }

    // Create a new account object
    const newAccount = {
      accountId: accountsDemo.length + 1, // Simple ID increment
      accountLabel: inputValue,
    };

    // Add the new account to the accountsDemo array
    accountsDemo.push(newAccount);

    // Clear the input field and close the modal
    setInputValue('');
    setShowAccountModal(false);
    console.log(accountsDemo)
  };
  const addAccountBtnClick = () => {
    setShowAccountModal(true);
  };

  
return (
    <View style={{ height: '100%'}}>
      <View style={styles.header}>
        <View style={styles.leftItemsStyle}>
          <TouchableOpacity
            style={styles.leftIconContainer}
            onPress={onPressBack}>
            <Ion name="arrow-back-outline" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleContainer}>
            <Text style={styles.title}>Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightItemsStyle}>
            <TouchableOpacity onPress={addAccountBtnClick}>
            <Text style={{color: 'white', fontWeight:'light', fontSize: 16}}>ADD ACCOUNT</Text>

            </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>

      
      <View style={styles.accountScreenContent}>
        {accountsDemo.map((item, index) => (
            
                <Text style={styles.accountItemStyle} key={index}>{item.accountLabel}</Text>
            
        ))}
      </View>
      
      <Modal
        visible={showAccountModal}
        transparent={true} 
        animationType="fade"
        onRequestClose={() => setShowAccountModal(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Name</Text>
            <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Enter account name"
        />
            <View style={{flexDirection: 'row', gap: 15, justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => setShowAccountModal(false)} style={styles.closeButton}>
              <Text style={styles.modalBtnText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
              <Text style={styles.modalBtnText}>SAVE</Text>
            </TouchableOpacity>
            </View>
            
          </View>
        
        </View>
      
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
    accountItemStyle: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 2,
        color: 'black',
        fontWeight: 'light'
    },
    accountScreenContent: {

    },
    modalBtnText:{
        fontWeight: 'bold',
        fontSize: 16
    },
    modalText:{
        color: 'black',
        fontSize: 22
    },
    modalOverlay:{
        height:'100%',
        alignItems: 'center',
        justifyContent : 'center'
    },
    modalContent:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 150

    },
  leftItemsStyle: {
    flexDirection: 'row',

  },
  rightItemsStyle: {},

 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0288D1',
    height: 60,
    paddingHorizontal: 10,
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
  
});

export default Account;
