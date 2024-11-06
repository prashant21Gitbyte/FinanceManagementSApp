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
import apiRequest from '../http/apiServiceT';

const AddIncomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('Others');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());

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

  const handleSave = async () => {
    // Prepare the payload for the POST request
    const payload = {
      amount: amount,
      paymentMethod: paymentMethod,
      date: date.toISOString(),
      time: time.toISOString(),
      subject: subject,
      description: description,
    };

    try {
      // Make the POST request using apiRequest helper
      const response = await apiRequest('/add/addincome', 'POST', payload);

      // Log the response from the API
      console.log('Income data saved successfully:', response.data);

      // Optionally handle success (e.g., show success message or reset fields)
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
        keyboardType="numeric"
      />

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Subject
      </Text>
      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder="Enter subject in 30 characters"
        style={styles.input}
        maxLength={30}
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.dateTimeContainer}>
          <Text>{date.toDateString()}</Text>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#333'}}>
        Time
      </Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <View style={styles.dateTimeContainer}>
          <Text>{time.toLocaleTimeString()}</Text>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
      </TouchableOpacity>

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
    backgroundColor: '#F6F6F6',
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
