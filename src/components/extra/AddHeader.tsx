// Header.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import AddExpenseScreen from '../screens/AddExpense';
import AddIncomeScreen from '../screens/AddIncome';
const Header = ({onPressBack, navigationValueProp}) => {
  const [selectedScreen, setSelectedScreen] = useState(navigationValueProp.navigationValue === 'addincome' ? 'Add Income' : 'Add Expense');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(navigationValueProp, "this is in the add header")
  useEffect(() => {
    console.log(selectedScreen)
  },[selectedScreen])
  
  
  
  const renderScreen = () => {
    switch (selectedScreen) {
      case 'Add Expense':
        return <AddExpenseScreen />;
      case 'Add Income':
        return <AddIncomeScreen />;
      default:
        return <AddExpenseScreen />;
    }
  };

  return (
    <View style={styles.headerScreenContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            onPressBack();
          }}>
          <Ion name="arrow-back-sharp" color="white" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.title}>{selectedScreen}</Text>
          <Ion name="chevron-down-sharp" color="white" size={19} />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/*
             <Button title="Add Expense" onPress={() => { setSelectedScreen('Add Expense'); setModalVisible(false); }} />
            <Button title="Add Income" onPress={() => { setSelectedScreen('Add Income'); setModalVisible(false); }} />
            */}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSelectedScreen('Add Expense');
                  setModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Add Expense</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSelectedScreen('Add Income');
                  setModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Add Income</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'transparent', 
    padding: 6, 
    borderRadius: 5, 
    margin: 5, 
    alignItems: 'left',
  },
  buttonText: {
    color: '#000000', 
    fontSize: 16, 
  },
  headerScreenContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 17,
    backgroundColor: '#03A9F4',
  },
  backButton: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default Header;
