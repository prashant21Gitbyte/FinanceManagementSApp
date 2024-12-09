import react ,{ useState, useEffect, } from 'react'
import {FlatList, StyleSheet, Text , View, TouchableOpacity, Button, Modal, Dimensions} from 'react-native'
import {Transactions} from '../utils/api'
import DateStepper from '../components/DateStepper'
import {format, parseISO, isWithinInterval } from 'date-fns'
import Ion from 'react-native-vector-icons/Ionicons';
import CalenderForRange from '../components/CalenderForRange';
import { BarChart } from 'react-native-chart-kit';


const PaymentMethodChart = ({onPressBack}) => {
    const [filterType, setFilterType] = useState('all');

  const [isRangePickerVisible, setRangePickerVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  
  const [filteredTransactions,setFilteredTransactions] = useState([])
  const [paymentData, setPaymentData] = useState([]);
  const [paymentTotals, setPaymentTotals] = useState({});



  useEffect(() => {
    filterTransactionsByDateRange();
  }, [selectedRange, Transactions]);

  useEffect(() => {
    
  },[filteredTransactions])

  useEffect(() => {
    if(filterType === 'all'){
      setSelectedRange(null)
    }
    
    //console.log(filterType)
    //console.log(selectedRange)
  }, [filterType]);


  useEffect(() => {
    calculatePaymentTotals();
  }, [filteredTransactions]);

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


  const handleSelectRange = range => {
    setSelectedRange(range);
    //console.log(range, typeof range);
    setRangePickerVisible(false);
    
    //console.log(selectedRange)
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


  
  const calculatePaymentTotals = () => {
    const totals = {};
    
    filteredTransactions.forEach(transaction => {
      const { modeOfPayment, amount, transactionType } = transaction;
      const amountValue = parseFloat(amount);

      if (!totals[modeOfPayment]) {
        totals[modeOfPayment] = 0;
      }
      
      if (transactionType === 'expense') {
        totals[modeOfPayment] -= amountValue;
      } else {
        totals[modeOfPayment] += amountValue;
      }
    });

    setPaymentTotals(totals);

    // Convert the totals to an array format suitable for the chart
    const data = Object.keys(totals).map(key => ({
      name: key,
      value: totals[key]
    }));
    
    setPaymentData(data);


    
  };
  const screenWidth = Dimensions.get('window').width;
    return(
        <View style={{height: '100%'}}>


<View style={styles.headerMain}>
        <TouchableOpacity onPress={() => onPressBack()}>
          <Ion name="arrow-back-sharp" color="black" size={26} />
        </TouchableOpacity>
        <Text style={styles.title2}>Payment Method Chart</Text>
        <TouchableOpacity onPress={() => setRangePickerVisible(true)}>
          <Ion name="calendar" color="black" size={26} />
        </TouchableOpacity>
      </View>
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
      </View>

      <View style={styles.container}>
      <Text style={styles.title}>Payment Method Chart</Text>
      {paymentData.length > 0 && 
      <BarChart
        data={{
          labels: paymentData.map(item => item.name),
          datasets: [{
            data: paymentData.map(item => item.value),
          }]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      }
  {paymentData.length > 0 && 
      <FlatList
        data={Object.keys(paymentTotals).map(key => ({
          name: key,
          amount: paymentTotals[key]
        }))}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text style={styles.paymentMethod}>{item.name}</Text>
            <Text style={styles.amount}>
              {item.amount >= 0 ? `₹${item.amount.toFixed(2)}` : `₹${Math.abs(item.amount).toFixed(2)}`}
            </Text>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.header}>Payment Method Totals</Text>}
      />
}
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


const styles= StyleSheet.create({
    headerMain: {
    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      title2: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
      },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
      },
      filter: {
        fontSize: 16,
        color: '#666',
      },
      selectedFilter: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: 'bold',
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
      info: {
        marginTop: 16,
        fontSize: 16,
      },
      container: {
        flex: 1,
        //backgroundColor: 'pink',
        padding: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      paymentItem: {
        //backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      paymentMethod: {
        fontSize: 16,
      },
      amount: {
        fontSize: 16,
        color: '#e26a00',
        fontWeight: 'bold',
      },
      header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
})
export default PaymentMethodChart