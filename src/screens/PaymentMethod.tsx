import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialMethods = [
  { id: '1', name: 'Bank' },
  { id: '2', name: 'Cash' },
  { id: '3', name: 'Card' },
];

const PaymentMethodScreen = ({onPressBack}) => {
  const [methods, setMethods] = useState(initialMethods);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);
  const [newMethodName, setNewMethodName] = useState('');

  const handleAddNew = () => {
    setIsEditing(false);
    setNewMethodName('');
    setModalVisible(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setMethods(prevMethods =>
        prevMethods.map(method =>
          method.id === currentMethod.id
            ? { ...method, name: newMethodName }
            : method
        )
      );
    } else {
      setMethods(prevMethods => [
        ...prevMethods,
        { id: (prevMethods.length + 1).toString(), name: newMethodName },
      ]);
    }
    setModalVisible(false);
  };

  const handleEdit = method => {
    setIsEditing(true);
    setCurrentMethod(method);
    setNewMethodName(method.name);
    setModalVisible(true);
  };

  const handleDelete = id => {
    setMethods(prevMethods => prevMethods.filter(method => method.id !== id));
  };

  const renderMethodItem = ({ item }) => (
    <View style={styles.methodItem}>
      <Text style={styles.methodName}>{item.name}</Text>
      <View style={{flexDirection: 'row', gap: 10}}>


      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Icon name="create-outline" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="trash-outline" size={20} color="gray" />
      </TouchableOpacity>
      </View>
      
    </View>
  );
  console.log()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity onPress={onPressBack}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
        </View>
        
        <TouchableOpacity onPress={handleAddNew} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={methods}
        renderItem={renderMethodItem}
        keyExtractor={item => item.id}
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter payment method name"
              value={newMethodName}
              onChangeText={setNewMethodName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSave}>
                <Text style={{}}>SAVE</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{}}>CANCEL</Text>
              </TouchableOpacity>
              
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    //flex: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  methodName: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    padding: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10
  },
});

export default PaymentMethodScreen;
