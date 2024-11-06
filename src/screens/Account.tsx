import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

// Sample data for accounts
let accountsDemo = [{ accountId: 1, accountLabel: "Account 1" }, { accountId: 2, accountLabel: "Account 2" }];

const Account = ({ onPressBack }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editingAccount, setEditingAccount] = useState(null); // New state for editing
  const [selectedAccount, setSelectedAccount] = useState(null); // New state for deletion

  // Handle input changes
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  // Handle saving new or edited account
  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      // Optionally handle empty input case
      return;
    }

    if (editingAccount) {
      // Update existing account
      const updatedAccounts = accountsDemo.map((account) =>
        account.accountId === editingAccount.accountId
          ? { ...account, accountLabel: inputValue }
          : account
      );
      accountsDemo = updatedAccounts;
    } else {
      // Create new account
      const newAccount = {
        accountId: accountsDemo.length + 1,
        accountLabel: inputValue,
      };
      accountsDemo.push(newAccount);
    }

    setInputValue('');
    setEditingAccount(null);
    setShowAccountModal(false);
    console.log(accountsDemo);
  };

  // Show modal for adding new account
  const addAccountBtnClick = () => {
    
    setInputValue('');
    setShowAccountModal(true);
  };

  // Handle edit button click
  const handleEdit = (account) => {
    setEditingAccount(account);
    setInputValue(account.accountLabel);
    setShowAccountModal(true);
  };

  // Handle delete button click
  const handleDelete = (account) => {
    setSelectedAccount(account);
    setShowDeleteConfirmModal(true);
  };

  // Confirm account deletion
  const confirmDelete = () => {
    accountsDemo = accountsDemo.filter(account => account.accountId !== selectedAccount.accountId);
    setShowDeleteConfirmModal(false);
    setSelectedAccount(null);
  };

  const handleParticularAccountClick = (accountId) => {
    console.log('this is good', accountId)

  }

  return (
    <View style={{ height: '100%' }}>
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
            <Text style={{ color: 'white', fontWeight: 'light', fontSize: 16 }}>ADD ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.accountScreenContent}>
        {accountsDemo.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => {handleEdit(item)}}>

            
          <View key={index} style={styles.accountItemContainer}>
            
            <Text style={styles.accountItemStyle}>{item.accountLabel}</Text>
            <View style={styles.accountActions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ion name="create-outline" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Ion name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          {/**
          <Modal transparent={true}>
            <View style={{backgroundColor: 'white', width: 70, height: 100, top:20}}><Text>This is a modal</Text></View>
          </Modal>
           */}
          {/*
                    <View style={{backgroundColor: 'yellow', width: 100, height: 100, position: 'absolute', top: 40}}><Text>this is a modal</Text></View>

          */}
          </TouchableOpacity>
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
            <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-end' }}>
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

      <Modal
        visible={showDeleteConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Delete</Text>
            <Text style={styles.modalText}>If you delete this account, all transactions associated with it will also be deleted.</Text>
            <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setShowDeleteConfirmModal(false)} style={styles.closeButton}>
                <Text style={styles.modalBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.closeButton}>
                <Text style={styles.modalBtnText}>DELETE</Text>
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
    
    padding: 15,
    marginBottom: 2,
    color: 'black',
    fontWeight: 'light'
  },
  accountScreenContent: {},
  accountItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 2,
    paddingRight : 10
  },
  accountActions: {
    flexDirection: 'row',
    gap: 10
  },
  modalBtnText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  modalText: {
    color: 'black',
    fontSize: 22
  },
  modalOverlay: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    width: 300,
    
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 8,
  },
  closeButton: {
    padding: 10,
  },
});

export default Account;
