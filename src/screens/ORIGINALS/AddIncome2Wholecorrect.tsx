import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper'; 

const AddIncomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('Air Tickets');
  const [paymentMethod, setPaymentMethod] = useState('Others');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [recurringDate, setRecurringDate] = useState(null); 
  const [showRecurringDatePicker, setShowRecurringDatePicker] = useState(false); 
  const [showReminderModal, setShowReminderModal] = useState(false); 
  const [reminderFrequency, setReminderFrequency] = useState('');

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

  const saveReminder = (frequency) => {
    setReminderFrequency(frequency);
    setShowReminderModal(false); 
  };

  const removeReminder = () => {
    setRecurringDate(null);
    setReminderFrequency('');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>Expense</Text>
      <TextInput placeholder="In Rupees" style={styles.input} />

      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Allowance" value="Allowance" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Taxes" value="Taxes" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Insurance" value="Insurance" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>Payment Method</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Bank" value="Bank" />
          <Picker.Item label="Card" value="Card" />
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>Notes</Text>
      <TextInput placeholder="Optional" style={styles.input} />

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

      {/* Recurring Date Picker and Reminder Modal */}
      <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>Recurring? Set Reminder</Text>
      <View style={styles.dateTimeContainer}>
        {recurringDate ? (
          <>
            <Text>{`${recurringDate.toDateString()} (${reminderFrequency})`}</Text>
            <TouchableOpacity onPress={removeReminder}>
              <Text style={{ color: 'red' }}>Remove</Text>
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

      <Modal visible={showReminderModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Set Reminder</Text>
            <View>
              <RadioButton.Group
                onValueChange={(value) => saveReminder(value)}
                value={reminderFrequency}
              >
                <RadioButton.Item label="Once" value="Once" />
                <RadioButton.Item label="Daily" value="Daily" />
                <RadioButton.Item label="Weekly" value="Weekly" />
                <RadioButton.Item label="Monthly" value="Monthly" />
                <RadioButton.Item label="Yearly" value="Yearly" />
              </RadioButton.Group>
            </View>
            <TouchableOpacity onPress={() => setShowReminderModal(false)} style={styles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveButton}>
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
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default AddIncomeScreen;
