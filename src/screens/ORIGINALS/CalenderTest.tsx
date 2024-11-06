import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const App = () => {
  // Define the period to be marked
  const markedDates = {
    '2024-08-01': { startingDay: true, color: 'blue', textColor: 'white' },
    '2024-08-02': { color: 'blue', textColor: 'white' },
    '2024-08-03': { endingDay: true, color: 'blue', textColor: 'white' },
    '2024-08-10': { marked: true, dotColor: 'red' },
    '2024-08-15': { marked: true, dotColor: 'green' }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Period Marking Example</Text>
      <Calendar
        markedDates={markedDates}
        markingType={'period'} // Set marking type to 'period'
      />
    </View>
  );
};

export default App;
