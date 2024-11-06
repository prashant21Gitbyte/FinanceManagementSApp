import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Ion from 'react-native-vector-icons/Ionicons';
import CalenderForRange from '../components/CalenderForRange';
import DateStepper from '../components/DateStepper';
import {format} from 'date-fns';
import dataStore from '../resources/data/dataStore.json';
import {parseISO, isWithinInterval} from 'date-fns';
import {TouchableWithoutFeedback} from 'react-native';

import TransactionDetail from '../screens/TransactionDetail';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import apiRequest from '../http/apiService';

const TransactionsScreen = ({onPressBack}) => {
  const [filterType, setFilterType] = useState('all');
  const [showMenu, setShowMenu] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRangePickerVisible, setRangePickerVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  //const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [amount, setAmount] = useState('');
  const [searchBy, setSearchBy] = useState('Category');
  const [transactionType, setTransactionType] = useState('All');
  //const [ordering, setOrdering] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const transactions = dataStore.Transactions;
  const [transactionsTotals, setTransactionsTotal] = useState({});

  //states for filtering logic by amount and category
  const [amountFilter, setAmountFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAmountModalVisible, setAmountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const categories = ['Air Tickets', 'Business'];
  const [ordering, setOrdering] = useState('Ascending');
  const [sortingOption, setSortingOption] = useState('DateAscending');
  const [Details, setDetails] = useState(true);
  const [DetailsPage, setDetailsPage] = useState(false);
  const [itemData, setItemdata] = useState(null);

  useEffect(() => {
    console.log('inside this use effect home');
    //const response = apiRequest('/gettransactions', 'GET', {}, {}, token);
  }, []);

  useEffect(() => {
    filterTransactions();
    //console.log(ordering)
  }, [ordering, sortingOption]);

  useEffect(() => {
    filterTransactionsByDateRange();
    console.log('selectedRange change');
    console.log(filterType);
  }, [selectedRange, transactions]);

  useEffect(() => {
    totalsCalculation();
  }, [filteredTransactions]);

  useEffect(() => {
    if (filterType === 'all') {
      setSelectedRange(null);
    }

    //console.log(filterType)
    //console.log(selectedRange)
  }, [filterType]);

  //console.log(filterType)
  const calculateTotals = {};
  const filterTransactionsByDateRange = () => {
    //console.log('transactions ',transactions)
    if (!selectedRange) return setFilteredTransactions(transactions);

    if (selectedRange === null) return setFilteredTransactions(transactions);
    const {startDate, endDate} = selectedRange;

    // Convert startDate and endDate to Date objects
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const transactionsFiltered = transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      //console.log('this is particular transaction DATE:', transactionDate, transaction.date)
      // Check if transaction date is within the selected range
      return isWithinInterval(transactionDate, {start, end});
    });
    setFilteredTransactions(transactionsFiltered);
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (selectedRange) {
      const {startDate, endDate} = selectedRange;
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      filtered = filtered.filter(transaction => {
        const transactionDate = parseISO(transaction.date);
        return isWithinInterval(transactionDate, {start, end});
      });
    }

    if (amountFilter) {
      filtered = filtered.filter(
        transaction => Number(transaction.amount) === Number(amountFilter),
      );
    }

    if (categoryFilter) {
      //console.log(categoryFilter)
      filtered = filtered.filter(
        transaction => transaction.category === categoryFilter,
      );
    }

    if (ordering) {
      /*
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (ordering === 'Ascending') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      */

      filtered = filtered.sort((a, b) => {
        if (sortingOption === 'DateAscending') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        } else if (sortingOption === 'DateDescending') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        } else if (sortingOption === 'CategoryAscending') {
          return a.category.localeCompare(b.category);
        } else if (sortingOption === 'CategoryDescending') {
          return b.category.localeCompare(a.category);
        }
        return 0;
      });
    }

    setFilteredTransactions(filtered);
    totalsCalculation();
  };
  console.log(selectedRange);

  {
    /** 

  const AmountFilterModal = () => (
    <Modal
      visible={isAmountModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Enter amount"
          value={amountFilter}
          onChangeText={setAmountFilter}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Apply" onPress={() => {
          setAmountModalVisible(false);
          filterTransactions();
        }} />
        <TouchableOpacity onPress={() => setAmountModalVisible(false)}>
          <Text>CLOSE</Text>
        </TouchableOpacity>
        {/*<Button title="Close" onPress={() => setAmountModalVisible(false)} />
      </View>
    </Modal>
  );
  */
  }
  const onPressBackFromDetails = () => {
    setDetailsPage(false);
    setDetails(true);
    setSelectedRange(null);
    //console.log(filteredTransactions)
  };
  const CategoryFilterModal = () => (
    <Modal
      visible={isCategoryModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainerAmount}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          {' '}
          Filter By Category
        </Text>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              setCategoryFilter(category);
              setCategoryModalVisible(false);
              filterTransactions();
            }}>
            <Text style={styles.option}>{category}</Text>
          </TouchableOpacity>
        ))}

        <Button
          title="Close"
          onPress={() => {
            setCategoryModalVisible(false), setShowMenu(false);
          }}
        />
      </View>
    </Modal>
  );

  const handleDateChangeStepper = (start, end) => {
    /*
    console.log("this is in handle date change stepper", start, end)
    const startDate = start.toString().split('T')[0];
    const endDate = end.toString().split('T')[0];
    
    console.log("this is after toString methods",startDate, endDate)
    console.log('........................');
    //console.log('this is  date stepper ', {start, end});

    //console.log('this is  with toString', {startDate, endDate});
    setSelectedRange({startDate, endDate})
    */

    if (!(start instanceof Date) || !(end instanceof Date)) {
      console.error('Invalid date objects', {start, end});
      return;
    }

    // Use date-fns to format dates in 'yyyy-MM-dd' format
    const startDate = format(start, 'yyyy-MM-dd');
    const endDate = format(end, 'yyyy-MM-dd');

    //console.log("this is after formatting methods", startDate, endDate);

    // Set the selected range
    setSelectedRange({startDate, endDate});

    //here i am using the same range as used for select range calender
    //setSelectedRange({startDate: start, endDate: end });
    // Fetch and update transactions based on the new date range
    //console.log('this handle date change called')
  };

  const totalsCalculation = () => {
    let totalIncome = 0,
      totalExpense = 0,
      totalBalance = 0;
    filteredTransactions?.map(item => {
      if (item.transactionType === 'income') {
        totalIncome += Number(item.amount);
      } else {
        totalExpense += Number(item.amount);
      }
    });
    totalBalance = totalIncome - totalExpense;

    setTransactionsTotal({totalIncome, totalExpense, totalBalance});
    //console.log("total income",totalIncome, "total expense",totalExpense,"balance", totalBalance)
  };

  const handleSelectRange = range => {
    setSelectedRange(range);
    //console.log(range, typeof range);
    setRangePickerVisible(false);
    setShowMenu(false);
    //console.log(selectedRange)
  };

  const ShowDetailspage = data => {
    setDetails(false);
    setDetailsPage(true);
    setItemdata(data);
  };

  const renderTransaction = ({item}) => (
    <TouchableOpacity onPress={() => ShowDetailspage(item)}>
      <View style={styles.row}>
        <View style={[styles.cell, {width: 95}]}>
          <Text style={styles.transactionText}>{item.date}</Text>
          <Text>{item.transactionTime}</Text>
          <Text
            style={[
              styles.transactionText,
              {
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                /*backgroundColor: '#2196F3'*/ backgroundColor: '#6199F7',
                padding: 2,
                paddingVertical: 4,
                fontSize: 12,
              },
            ]}>
            {item.modeOfPayment}
          </Text>
        </View>

        <Text style={[styles.cell, , {color: 'black'}]}>{item.category}</Text>
        {item.transactionType === 'income' ? (
          <>
            <Text style={[styles.cell, styles.transactionText]}>
              {item.amount}
            </Text>
            <Text style={styles.cell}></Text>
          </>
        ) : (
          <>
            <Text style={styles.cell}></Text>
            <Text style={[styles.cell, styles.transactionText]}>
              {item.amount}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    handleDateChangeStepper(selectedDate, selectedDate);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {}, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {Details && filteredTransactions && (
          <View style={styles.container}>
            {/* <View style={styles.header}>
              <Text style={styles.title}>Transactions</Text> 
              <TouchableOpacity onPress={toggleMenu}>
                <Ion name="menu" color="black" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.filterContainer}>
              {['all', 'daily', 'weekly', 'monthly', 'yearly'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFilterType(type)}>
                  <Text
                    style={
                      filterType === type
                        ? styles.selectedFilter
                        : styles.filter
                    }>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{margin: 10, alignItems: 'center'}}>
              {filterType !== 'all' && (
                <DateStepper
                  filterType={filterType}
                  onDateChange={handleDateChangeStepper}
                />
              )}
              {selectedRange && (
                <Text style={styles.info}>
                  Selected Range: {selectedRange.startDate} -{' '}
                  {selectedRange.endDate}
                </Text>
              )}
            </View>
            */}

            <View style={styles.table}>
              <View style={styles.headerRow}>
                <View style={styles.cell}>
                  <Text style={styles.headerTable}>Date</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.headerTable}>Category</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.headerTable}>Income</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.headerTable}>Expense</Text>
                </View>
              </View>

              <FlatList
                data={filteredTransactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id.toString()}
                style={styles.transactionList}
              />
            </View>
            <View style={styles.footerBarcontainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 19}}>
                  {transactionsTotals.totalIncome}
                </Text>
                <Text style={{color: 'white'}}>Total Income</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 19}}>
                  {transactionsTotals.totalExpense}
                </Text>
                <Text style={{color: 'white'}}>Total Expense</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 19}}>
                  {transactionsTotals.totalBalance}
                </Text>
                <Text style={{color: 'white'}}>Total Balance</Text>
              </View>
            </View>

            {showMenu && (
              <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
                <View style={styles.overlay}>
                  <View style={styles.menu}>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setShowDatePicker(true), setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setRangePickerVisible(true);
                        setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Date Range</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setAmountModalVisible(true), setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Amount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setSortingOption('DateAscending'), setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Date Ascending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setSortingOption('DateDescending'), setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Date Descending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setSortingOption('CategoryAscending'),
                          setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Category Ascending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setSortingOption('CategoryDescending'),
                          setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Category Descending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setCategoryModalVisible(true), setShowMenu(false);
                      }}>
                      <Text style={{color: 'black'}}>Category</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => console.log('Ordering')}>
                      <Text style={{color: 'black'}}>Ordering</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Modal
              visible={isRangePickerVisible}
              transparent={true}
              animationType="fade">
              <View style={styles.modalContainer}>
                <CalenderForRange onSelectRange={handleSelectRange} />
                <Button
                  title="Close"
                  onPress={() => setRangePickerVisible(false)}
                />
              </View>
            </Modal>
            {/*<AmountFilterModal />*/}
            <CategoryFilterModal />

            <Modal
              visible={isAmountModalVisible}
              transparent={true}
              animationType="fade">
              <View style={styles.modalContainerAmount}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    marginBottom: 15,
                  }}>
                  {' '}
                  Filter By Amount
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  value={amountFilter}
                  onChangeText={setAmountFilter}
                  keyboardType="numeric"
                  style={styles.input}
                />
                {/*<Button title="Apply" onPress={() => {
        setAmountModalVisible(false);
        filterTransactions();
      }} />*/}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    justifyContent: 'space-evenly',
                    alignItems: 'streach',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    style={{backgroundColor: '#2196F3', flex: 1}}
                    onPress={() => {
                      setAmountModalVisible(false);
                      filterTransactions();
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 5,
                        textAlign: 'center',
                      }}>
                      APPLY
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{backgroundColor: '#2196F3', flex: 1}}
                    onPress={() => {
                      setAmountModalVisible(false), setShowMenu(false);
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 5,
                        textAlign: 'center',
                      }}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </View>

                {/*<Button title="Close" onPress={() => setAmountModalVisible(false)} />*/}
              </View>
            </Modal>
          </View>
        )}
        {DetailsPage && (
          <TransactionDetail
            data={itemData}
            onPressBackFromDetails={onPressBackFromDetails}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  container: {
    flex: 1,
    //paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
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
  menu: {
    elevation: 10,
    //paddingHorizontal: 30,
    //paddingVertical: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    width: 190,
    borderColor: '#ddd',
    position: 'absolute',
    top: 60,
    right: 15,
    zIndex: 1000,
  },
  transactionList: {
    padding: 10,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  info: {
    marginTop: 20,
    fontSize: 16,
  },
  modalContainerAmount: {
    alignSelf: 'center',
    elevation: 10,
    backgroundColor: 'white',

    width: 350,
    height: 200,

    //backgroundColor: 'red',
    justifyContent: 'center',

    padding: 20,
    marginTop: 200,
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
  table: {
    alignItems: 'center',
    margin: 10,
    //paddingBottom: 20,
    height: '85%',
    //borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    //elevation: 5,
  },
  row: {
    //elevation: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,

    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    //backgroundColor: '#f0f0f0',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 6,
  },
  cell: {
    justifyContent: 'center',
    width: 90,
    padding: 10,
  },

  transactionText: {
    color: 'black',
  },
  headerTable: {
    fontWeight: 'bold',
    color: 'black',
  },

  menuOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //zIndex: 999,
  },
  footerBarcontainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    paddingHorizontal: 10,
    backgroundColor: '#3F84F7',

    //backgroundColor: '#2196F3',

    elevation: 10,
  },
});

export default TransactionsScreen;
