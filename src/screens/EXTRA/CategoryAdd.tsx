import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabs from '../components/ReminderTabs'; // Assuming this is your tabs component

// Initial categories for INCOME and EXPENSE
const initialIncomeCategories = [
  { id: '1', name: 'Salary' },
  { id: '2', name: 'Investment' },
];

const initialExpenseCategories = [
  { id: '1', name: 'Rent' },
  { id: '2', name: 'Groceries' },
];

// Tab component to render the list of categories and handle add/edit/delete
const CategoryTab = ({ categories, setCategories, isIncome }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddNew = () => {
    setIsEditing(false);
    setNewCategoryName('');
    setModalVisible(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category.id === currentCategory.id
            ? { ...category, name: newCategoryName }
            : category
        )
      );
    } else {
      setCategories(prevCategories => [
        ...prevCategories,
        { id: (prevCategories.length + 1).toString(), name: newCategoryName },
      ]);
    }
    setModalVisible(false);
  };

  const handleEdit = category => {
    setIsEditing(true);
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setModalVisible(true);
  };

  const handleDelete = id => {
    setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.methodItem}>
      <Text style={styles.methodName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="create-outline" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
        <Icon name="add-circle" size={60} color="#007bff" />
      </TouchableOpacity>
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
              placeholder="Enter category name"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.modalButtonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CategoryScreen = ({ onPressBack }) => {
  const [incomeCategories, setIncomeCategories] = useState(initialIncomeCategories);
  const [expenseCategories, setExpenseCategories] = useState(initialExpenseCategories);

  const tabs = [
    { title: 'INCOME', component: <CategoryTab categories={incomeCategories} setCategories={setIncomeCategories} isIncome={true} /> },
    { title: 'EXPENSE', component: <CategoryTab categories={expenseCategories} setCategories={setExpenseCategories} isIncome={false} /> },
  ];

  return (
    <View style={{ flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftIconContainer} onPress={onPressBack}>
          <Icon name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
      </View>
      <CustomTabs tabs={tabs} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0288D1',
    height: 60,
    paddingHorizontal: 10,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 10,
  },
  title: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
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
    justifyContent: 'space-between',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default CategoryScreen;
