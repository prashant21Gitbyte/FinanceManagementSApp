import React, {useState} from 'react';
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

const AddIncomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('Others');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());

  const [showRecurringDatePicker, setShowRecurringDatePicker] = useState(false); // State to show/hide the recurring date picker
  const [showReminderModal, setShowReminderModal] = useState(false); // State to show/hide the reminder modal
  const [reminderFrequency, setReminderFrequency] = useState(''); // State to store the selected reminder frequency

  const [amount, setAmount] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
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
      const response = await apiRequest('/addincome', 'POST', payload);
      //console.log('..........................................')
      //console.log('Save response:', response);
    } catch (error) {
      console.error('Error saving income:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Income
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
        Payment Method
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={itemValue => setPaymentMethod(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Online" value="Online" />
          <Picker.Item label="Cash" value="Cash" />
        </Picker>
      </View>
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Date
      </Text>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text>{date.toDateString()}</Text>
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
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Time
      </Text>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
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
    fontWeight: 'bold',
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

export default AddIncomeScreen;
