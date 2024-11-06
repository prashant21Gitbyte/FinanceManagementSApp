import React ,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DateRangePicker = ({onSelectRange}) => {
    const [selectedRange, setSelectedRange] = useState({
      startDate: '',
      endDate: '',
    });
  
    const handleDayPress = (day) => {
      const { dateString } = day;
  
      if (!selectedRange.startDate || (selectedRange.endDate && selectedRange.startDate && dateString < selectedRange.startDate)) {
        // Start a new range
        setSelectedRange({ startDate: dateString, endDate: '' });
      } else if (!selectedRange.endDate && dateString >= selectedRange.startDate) {
        // End the range
        setSelectedRange({ ...selectedRange, endDate: dateString });
        if (onSelectRange) onSelectRange({ ...selectedRange, endDate: dateString });
      } else {
        // Reset the range if the selected date is before the start date
        setSelectedRange({ startDate: dateString, endDate: '' });
      }
    };
  
    const getMarkedDates = () => {
      const { startDate, endDate } = selectedRange;
      if (!startDate || !endDate) return {};
  
      const marked = {};
      let currentDate = new Date(startDate);
      const endDateObj = new Date(endDate);
  
      while (currentDate <= endDateObj) {
        const dateString = currentDate.toISOString().split('T')[0];
        marked[dateString] = {
          color: '#70d7c7',
          textColor: 'white',
          startingDay: dateString === startDate,
          endingDay: dateString === endDate,
          middle: dateString !== startDate && dateString !== endDate,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return marked;
    };
  
    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Select a Date Range</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType={'period'}
        />
        {selectedRange.startDate && (
          <Text style={styles.info}>
            Selected Range: {selectedRange.startDate} - {selectedRange.endDate || '...'}
          </Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      //elevation: 5,
      backgroundColor:"white"
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    info: {
      marginTop: 20,
      fontSize: 16,
    },
  });
  
  export default DateRangePicker;
  