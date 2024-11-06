// AddExpenseScreen.js
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import apiRequest from '../http/apiService';

const AddExpenseScreen = () => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [category, setCategory] = React.useState('Air Tickets');
  const [paymentMethod, setPaymentMethod] = React.useState('Others');
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [recurringDate, setRecurringDate] = React.useState(null);
  const [showRecurringDatePicker, setShowRecurringDatePicker] =
    React.useState(false);
  const [showReminderModal, setShowReminderModal] = React.useState(false);
  const [reminderFrequency, setReminderFrequency] = React.useState('');

  const [amount, setAmount] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const onRecurringDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || recurringDate;
    setShowRecurringDatePicker(false);
    setRecurringDate(currentDate);
    setShowReminderModal(true);
  };

  const saveReminder = frequency => {
    setReminderFrequency(frequency);
    setShowReminderModal(false);
  };

  const removeReminder = () => {
    setRecurringDate(null);
    setReminderFrequency('');
  };

  const handleSave = async () => {
    const payload = {
      amount: amount,
      category: category,
      paymentMethod: paymentMethod,
      date: date.toISOString(),
      time: time.toISOString(),
      recurringDate: recurringDate ? recurringDate.toISOString() : null,
      reminderFrequency: reminderFrequency,
      notes: notes,
    };
    try {
      const response = await apiRequest('/addexpense', 'POST', payload);
      //console.log('..........................................')
      //console.log('Save response:', response);
    } catch (error) {
      console.error('Error saving income:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Expense
      </Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="In Rupees"
        style={styles.input}
      />

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Subject
      </Text>
      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder="Enter subject in 50 characters"
        style={styles.input}
      />

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Description
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        style={styles.input}
      />
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Category
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Air Tickets" value="Air Tickets" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Taxes" value="Taxes" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Insurance" value="Insurance" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Payment Method
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Bank" value="Bank" />
          <Picker.Item label="Card" value="Card" />
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Others" value="Others" />
          {/* Add more payment methods here */}
        </Picker>
      </View>

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Notes
      </Text>

      <TextInput
        placeholder="Optional"
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
      />
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={{color: 'black'}}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      {/*<TextInput placeholder="Time" style={styles.input} />*/}

      {/*<Text style={styles.label}>Time</Text> */}

      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={{color: 'black'}}>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>

      {/* Recurring Date Picker and Reminder Modal */}
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Recurring? Set Reminder
      </Text>
      <View style={styles.dateTimeContainer}>
        {recurringDate ? (
          <>
            <Text>{`${recurringDate.toDateString()} (${reminderFrequency})`}</Text>
            <TouchableOpacity onPress={removeReminder}>
              <Text style={{color: 'red'}}>Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setShowRecurringDatePicker(true)}>
            <Text>Set Recurring Date</Text>
          </TouchableOpacity>
        )}
        {showRecurringDatePicker && (
          <DateTimePicker
            value={recurringDate || new Date()}
            mode="date"
            display="default"
            onChange={onRecurringDateChange}
          />
        )}
      </View>

      <Modal
        visible={showReminderModal}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Set Reminder</Text>
            <View>
              <RadioButton.Group
                onValueChange={value => saveReminder(value)}
                value={reminderFrequency}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Once" />
                  <Text>Once</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Daily" />
                  <Text>Daily</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Weekly" />
                  <Text>Weekly</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Monthly" />
                  <Text>Monthly</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Yearly" />
                  <Text>Yearly</Text>
                </View>
              </RadioButton.Group>
            </View>
            <TouchableOpacity
              onPress={() => setShowReminderModal(false)}
              style={styles.closeButton}>
              <Text style={{color: 'white'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    height: 50,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    //marginVertical: 5
    marginVertical: 'auto',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default AddExpenseScreen;
