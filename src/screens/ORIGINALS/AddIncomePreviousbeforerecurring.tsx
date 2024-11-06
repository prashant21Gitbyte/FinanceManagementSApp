// AddExpenseScreen.js
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddIncomeScreen = () => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [category, setCategory] = React.useState('Air Tickets');
  const [paymentMethod, setPaymentMethod] = React.useState('Others');
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };


  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setTime(currentTime);
  }

  return (
    <View style={styles.container}>
        <Text style={{fontSize:17, fontWeight: 'bold', color: '#333'}}>Expense</Text>
      <TextInput placeholder="In Rupees" style={styles.input} />
      
      <Text style={{fontSize:17, fontWeight: 'bold', color: '#333'}}>Category</Text>

      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
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
      

      <Text style={{fontSize:17, fontWeight: 'bold', color: '#333'}}>Payment Method</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Bank" value="Bank" />
        <Picker.Item label="Card" value="Card" />
        <Picker.Item label="Cash" value="Cash" />
        <Picker.Item label="Others" value="Others" />
        {/* Add more payment methods here */}
      </Picker>
      </View>

      <Text style={{fontSize:17, fontWeight: 'bold', color: '#333'}}>Notes</Text>


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
      {/*<TextInput placeholder="Time" style={styles.input} />*/}

        {/*<Text style={styles.label}>Time</Text> */}
      
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text>{date.toLocaleTimeString()}</Text>
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


      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer:{
    borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5, height: 50
  },
  container: {
    flex: 1,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    //marginVertical: 5
    marginVertical: 'auto'
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginVertical: 5
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default AddIncomeScreen;
