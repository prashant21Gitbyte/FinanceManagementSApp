
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { addDays, subDays, format, startOfWeek, addWeeks, subWeeks, startOfMonth, addMonths, subMonths, startOfYear, addYears, subYears } from 'date-fns';

const Stepper = ({ filterType, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    updateDateRange(currentDate);
  }, [currentDate, filterType]);

  const updateDateRange = (date) => {
    let startDate, endDate;
    //console.log("handleDateRange was called")
    switch (filterType) {
      case 'daily':

        startDate = date;
        endDate = date;
        break;
      case 'weekly':
        startDate = startOfWeek(date);
        endDate = addDays(startDate, 6);
        break;
      case 'monthly':
        startDate = startOfMonth(date);
        endDate = addMonths(startDate, 1);
        endDate = subDays(endDate, 1);
        break;
      case 'yearly':
        startDate = startOfYear(date);
        endDate = addYears(startDate, 1);
        endDate = subDays(endDate, 1);
        break;
      default:
        startDate = date;
        endDate = date;
        break;
    }
    //console.log('from DateStepper::::')
    //console.log('Update Date Range:', { startDate, endDate });
    onDateChange(startDate, endDate);
  };

  const handlePrevious = () => {
    //console.log(filterType, "this is the filger type")
    
    let newDate;
    switch (filterType) {
      case 'daily':
        //console.log("daily")
        newDate = subDays(currentDate, 1);
        break;
      case 'weekly':
        //console.log("w")
        newDate = subWeeks(currentDate, 1);
        break;
      case 'monthly':
        //console.log("m")
        newDate = subMonths(currentDate, 1);
        break;
      case 'yearly':
        //console.log("y")
        newDate = subYears(currentDate, 1);
        break;
      default:
        newDate = currentDate;
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    let newDate;
    switch (filterType) {
      case 'daily':
        //console.log("date in handle next",currentDate)
        newDate = addDays(currentDate, 1);
        //console.log("date in new Date",newDate)
        break;
      case 'weekly':
        newDate = addWeeks(currentDate, 1);
        break;
      case 'monthly':
        newDate = addMonths(currentDate, 1);
        break;
      case 'yearly':
        newDate = addYears(currentDate, 1);
        break;
      default:
        newDate = currentDate;
        break;
    }
    setCurrentDate(newDate);
  };

  const getFormattedDate = () => {
    
    switch (filterType) {
      case 'daily':
        return format(currentDate, 'yyyy-MM-dd');
      case 'weekly':
        return `${format(startOfWeek(currentDate), 'yyyy-MM-dd')} - ${format(addDays(startOfWeek(currentDate), 6), 'yyyy-MM-dd')}`;
      case 'monthly':
        return format(currentDate, 'yyyy-MM');
      case 'yearly':
        return format(currentDate, 'yyyy');
      default:
        return format(currentDate, 'yyyy-MM-dd');
    }
  };

  return (
    <View style={{ backgroundColor: '#E9E9E9', flexDirection: 'row', alignItems: 'center' }}>
      <Button title="◀" onPress={handlePrevious} />
      <Text style={{ marginHorizontal: 20 }}>{getFormattedDate()}</Text>
      <Button title="▶" onPress={handleNext} />
    </View>
  );
};

export default Stepper;
