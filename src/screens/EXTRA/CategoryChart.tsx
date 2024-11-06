import react, {useState,useEffect } from 'react'

import {Transactions} from '../utils/api'

import {Button, Modal, Text,View, StyleSheet, TouchableOpacity} from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'
import CustomTabs from '../components/ReminderTabs'
import ReminderCard from '../components/ReminderCard'
import Summary from '../components/CategoryChartComponents/Summary'
import Expense from '../components/CategoryChartComponents/Expense'
import Income from '../components/CategoryChartComponents/Income'
import CalenderForRange from '../components/CalenderForRange';
import DateStepper from '../components/DateStepper'
import {format, parseISO, isWithinInterval } from 'date-fns'
import DonutChart from '../components/CategoryChartComponents/DonutChart'


const Tab1Screen = ({ filterType, setFilterType, handleDateChangeStepper, selectedRange, transactions  }) => {

  return(
    
    <View style={styles.screen}>

      <View style={styles.filterContainer}>
        {['all', 'daily', 'weekly', 'monthly', 'yearly'].map(type => (
          <TouchableOpacity key={type} onPress={() => setFilterType(type)}>
            <Text
              style={
                filterType === type ? styles.selectedFilter : styles.filter
              }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{margin: 10,alignItems: 'center'}}>
        <DateStepper
          filterType={filterType}
          onDateChange={handleDateChangeStepper}
        />
        {selectedRange && (
          <Text style={styles.info}>
            Selected Range: {selectedRange.startDate} - {selectedRange.endDate}
          </Text>
        )}

    <DonutChart transactions={transactions} selectedRange={selectedRange} chartType="overall" />
      </View>
     
     
      
    </View>
    )
};




const Tab2Screen = ({ filterType, setFilterType, handleDateChangeStepper, selectedRange, transactions  }) => {

  return(
    
    <View style={styles.screen}>

      <View style={styles.filterContainer}>
        {['all', 'daily', 'weekly', 'monthly', 'yearly'].map(type => (
          <TouchableOpacity key={type} onPress={() => setFilterType(type)}>
            <Text
              style={
                filterType === type ? styles.selectedFilter : styles.filter
              }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{margin: 10,alignItems: 'center'}}>
        <DateStepper
          filterType={filterType}
          onDateChange={handleDateChangeStepper}
        />
        {selectedRange && (
          <Text style={styles.info}>
            Selected Range: {selectedRange.startDate} - {selectedRange.endDate}
          </Text>
        )}


<DonutChart transactions={transactions} selectedRange={selectedRange} chartType="expense" />
      </View>
     
     
      
    </View>
    )
};

  
const Tab3Screen = ({ filterType, setFilterType, handleDateChangeStepper, selectedRange, transactions  }) => {

  return(
    
    <View style={styles.screen}>

      <View style={styles.filterContainer}>
        {['all', 'daily', 'weekly', 'monthly', 'yearly'].map(type => (
          <TouchableOpacity key={type} onPress={() => setFilterType(type)}>
            <Text
              style={
                filterType === type ? styles.selectedFilter : styles.filter
              }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{margin: 10,alignItems: 'center'}}>
        <DateStepper
          filterType={filterType}
          onDateChange={handleDateChangeStepper}
        />
        {selectedRange && (
          <Text style={styles.info}>
            Selected Range: {selectedRange.startDate} - {selectedRange.endDate}
          </Text>
        )}

<DonutChart transactions={transactions} selectedRange={selectedRange} chartType="income" />

      </View>
     
     
      
    </View>
    )
};


  


const CategoryChart = ({onPressBack}) => {
  const [isRangePickerVisible, setRangePickerVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filteredTransactions,setFilteredTransactions] = useState([])

  
  useEffect(() => {
    filterTransactionsByDateRange();
  }, [selectedRange, Transactions]);

  useEffect(() => {
    if(filterType === 'all'){
      setSelectedRange(null)
    }
    
    //console.log(filterType)
    //console.log(selectedRange)
  }, [filterType]);


  const filterTransactionsByDateRange = () => {
    //console.log('transactions ',transactions)
    if (!selectedRange)  return setFilteredTransactions(Transactions);
   
    if(selectedRange === null) return setFilteredTransactions(Transactions);
    const { startDate, endDate } = selectedRange;
    
    // Convert startDate and endDate to Date objects
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const transactionsFiltered =  Transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      //console.log('this is particular transaction DATE:', transactionDate, transaction.date)
      // Check if transaction date is within the selected range
      return isWithinInterval(transactionDate, { start, end });
    });
    setFilteredTransactions(transactionsFiltered)
  };



  const handleDateChangeStepper = (start, end) => {
    

    if (!(start instanceof Date) || !(end instanceof Date)) {
      console.error("Invalid date objects", { start, end });
      return;
    }
  
   
    const startDate = format(start, 'yyyy-MM-dd');
    const endDate = format(end, 'yyyy-MM-dd');
  
    

    setSelectedRange({ startDate, endDate });

   
  };

  const handleSelectRange = range => {
    setSelectedRange(range);
    //console.log(range, typeof range);
    setRangePickerVisible(false);
    
    //console.log(selectedRange)
  };

  
    const tabs = [
        { title: 'Summary', component: <Tab1Screen filterType={filterType} setFilterType={setFilterType} handleDateChangeStepper={handleDateChangeStepper} selectedRange={selectedRange} transactions={filteredTransactions} />},
        { title: 'Expense', component: <Tab2Screen filterType={filterType} setFilterType={setFilterType} handleDateChangeStepper={handleDateChangeStepper} selectedRange={selectedRange} transactions={filteredTransactions} />},
        { title: 'Income', component: <Tab3Screen filterType={filterType} setFilterType={setFilterType} handleDateChangeStepper={handleDateChangeStepper} selectedRange={selectedRange} transactions={filteredTransactions} />},
        
      ];

    
    return(
        <View style={{ height: '100%'}}>

            <View style={styles.header}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={onPressBack}>
                <Ion name='arrow-back-outline' size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer}>
                
                <Text style={styles.title}>Category Chart</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setRangePickerVisible(true)}>
                <Ion name="calendar" color="white" size={22} />
              </TouchableOpacity>
        </View>
        
        <CustomTabs tabs={tabs} />
        {/* this is footer */}
        
        <View style={styles.footerContainer}>
          <View style={styles.footerItemContainer}>
            <View style={[styles.footerItemColor, {backgroundColor: '#FDE937',}]}></View>
            <Text>Once</Text>
          </View>
          <View style={styles.footerItemContainer}>
            <View style={[styles.footerItemColor, {backgroundColor: '#FD501A',}]}></View>
            <Text>Daily</Text>
          </View>
          <View style={styles.footerItemContainer}>
            <View style={[styles.footerItemColor, {backgroundColor: '#00A7F7',}]}></View>
            <Text>Weekly</Text>
          </View>
          <View style={styles.footerItemContainer}>
            <View style={[styles.footerItemColor, {backgroundColor: '#4BAF50',}]}></View>
            <Text>Monthly</Text>
          </View>
          <View style={styles.footerItemContainer}>
            <View style={[styles.footerItemColor, {backgroundColor: '#C31364',}]}></View>
            <Text>Yearly</Text>
          </View>
        </View> 
          
        <Modal
        visible={isRangePickerVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}>
          <CalenderForRange onSelectRange={handleSelectRange} />
          <Button title="Close" onPress={() => setRangePickerVisible(false)} />
        </View>
      </Modal>
        </View>
        
    )





   
}


const styles = StyleSheet.create({

  filter: {
    fontSize: 16,
    color: '#666',
  },
  selectedFilter: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  modalContainer: {
    alignSelf: 'center',
    elevation: 10,
    backgroundColor: 'white',

    width: 350,
    height: 500,

    //backgroundColor: 'red',
    justifyContent: 'center',
   
    padding: 20,
    marginTop: 100,
  },

    screen: {
        flex: 1,
        width: '100%',
        //backgroundColor: 'yellow',
        
        alignItems: 'center',
      },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        height: 60,
        paddingHorizontal: 10,
    },
    leftIconContainer: {
        marginRight: 10,
      },
      titleContainer: {
        marginRight: 'auto',
      },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      footerContainer: {
        flexDirection: 'row',
        gap: 20,
        backgroundColor: 'white',
        bottom: 0,
        
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerItemColor:{
        
        height: 20,
        width: 10
      },
      footerItemContainer:{
        flexDirection: 'row',
        gap: 5,

      },
      headingsContainer:{
        height: 60,
        backgroundColor: 'white',
        width: '100'
      }

})

export default CategoryChart