import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import dataStore from '../resources/data/dataStore.json';
import {useNavigation} from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

const App = ({onPressTransactions, onPressTransfer}) => {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('inside this use effect home');
    // Removed token-based request, as the token is no longer in use
    // const response = apiRequest('/gettransactions', 'GET', {}, {}, token)
  }, []);

  const handleAddBtnClick = () => {
    setIsAddBtnClicked(!isAddBtnClicked);
  };

  const AddBtnContent = () => {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 100,
          right: 50,
          width: 180,
          height: 300,
          gap: 16,
        }}>
        <View
          style={{
            marginRight: 0,
            width: 120,
            flexDirection: 'row',
            right: 0,
            gap: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              right: 0,
              color: 'white',
              backgroundColor: '#2196F3',
              padding: 10,
              borderRadius: 5,
            }}>
            Transactions
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transactions');
            }}>
            <Ion
              style={{backgroundColor: '#2196F3', padding: 5, borderRadius: 25}}
              color="white"
              name="list-outline"
              size={40}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 120,
            flexDirection: 'row',
            right: -2,
            gap: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: 'white',
              backgroundColor: '#4BAE51',
              padding: 10,
              borderRadius: 5,
            }}>
            Add Income
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddIncome');
            }}>
            <Ion
              style={{backgroundColor: '#4BAE51', padding: 5, borderRadius: 25}}
              color="white"
              name="add-circle-outline"
              size={40}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 120,
            flexDirection: 'row',
            right: 4,
            gap: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: 'white',
              backgroundColor: '#FE0000',
              padding: 10,
              borderRadius: 5,
            }}>
            Add Expense
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddExpense');
            }}>
            <Ion
              style={{backgroundColor: '#FE0000', padding: 5, borderRadius: 25}}
              color="white"
              name="remove-circle-outline"
              size={40}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#292D32',
            elevation: 2,
            //height: 190,
            //width: '100%',
            margin: 7,
            padding: 20,
            paddingHorizontal: 20,

            borderRadius: 30,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Hi, There!</Text>
          <View
            style={
              {
                //backgroundColor: 'red',
                // justifyContent: 'center',
                // alignItems: 'center',
              }
            }>
            <Text style={{color: 'white', fontSize: 50, fontWeight: 'bold'}}>
              ₹4,00,000
            </Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Current Balance
            </Text>

            <View style={{flexDirection: 'row', gap: 20, marginVertical: 20}}>
              <View>
                <Text
                  style={{color: '#4CAF50', fontSize: 20, fontWeight: 'bold'}}>
                  ₹10,00,000
                </Text>
                <Text
                  style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Total Income
                </Text>
              </View>

              <View>
                <Text
                  style={{color: '#F44336', fontSize: 20, fontWeight: 'bold'}}>
                  ₹6,00,000
                </Text>
                <Text
                  style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  Total Expense
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddIncome');
            }}
            style={[styles.incomeButton, styles.fourButtons]}>
            <Ion name="add-circle-outline" size={35} color="black" />
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddExpense');
            }}
            style={[styles.expenseButton, styles.fourButtons]}>
            <Ion name="remove-circle-outline" size={35} color="black" />
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transactions');
            }}
            style={[styles.transactionsButton, styles.fourButtons]}>
            <Ion name="list" size={35} color="black" />
            <Text style={styles.actionText}>Transactions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentTransactions}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Text style={styles.sectionHeader}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Transactions');
              }}
              style={{alignItems: 'flex-end'}}>
              <Text style={styles.viewMoreText}>+View more</Text>
            </TouchableOpacity>
          </View>

          {dataStore.Transactions.slice(0, 4).map((item, index) => (
            <View key={index} style={styles.transaction}>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.textColor]}>{item.date}</Text>
                <Text style={[styles.paymentMethodText, styles.textColor]}>
                  {item.modeOfPayment}
                </Text>
              </View>

              <Text
                style={[
                  {
                    alignSelf: 'flex-start',
                    color: 'black',
                    //backgroundColor: 'red',
                    color: 'gray',
                    fontWeight: 'bold',
                    maxWidth: 160,
                    textAlign: 'left',
                  },
                ]}>
                {item.subject}
              </Text>

              <View style={{alignItems: 'flex-end'}}>
                <Text style={[styles.amount, styles.textColor]}>
                  {item.amount}
                </Text>
                {item.transactionType === 'income' ? (
                  <Text style={[styles.transactionType]}>Income</Text>
                ) : (
                  <Text style={[styles.transactionType]}>Expense</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {isAddBtnClicked && AddBtnContent()}
      <TouchableOpacity onPress={handleAddBtnClick} style={styles.fab}>
        {!isAddBtnClicked ? (
          <Icon name="add" size={30} color="#fff" />
        ) : (
          <Icon name="close" size={30} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMoreText: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
  incomeTextPresent: {
    color: 'green',
  },
  expenseTextPresent: {
    color: 'red',
  },
  textColor: {
    color: 'black',
  },
  cardTextColor: {
    color: 'black',
  },
  paymentMethodText: {
    padding: 2,
    marginTop: 5,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    borderRadius: 5,
    backgroundColor: '#D0E3F1',
    borderColor: 'black',
  },
  balanceRow2: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  containText: {
    borderWidth: 0.5,
    flex: 3,
    alignItems: 'center',
    padding: 10,
  },
  pbb: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    width: '100%',
    flexDirection: 'row',
    textAlign: 'right',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
  },
  container: {
    padding: 5,
    flex: 1,
    height: 500,
    //backgroundColor: '#f5f5f5',
    backgroundColor: '#F6F6F6',
  },
  actionButtons: {
    //borderWidth: 1,
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
    //padding: 6,
    padding: 10,
  },
  incomeButton: {
    //backgroundColor: '#4caf50',
    //backgroundColor: '#CCFFCC',
    backgroundColor: '#FFFFFF',
    flex: 1,
    //elevation: 2,
    borderRadius: 19,
    alignItems: 'center',
  },
  fourButtons: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  expenseButton: {
    //backgroundColor: '#f44336',
    backgroundColor: '#FFCCCC',
    flex: 1,
    //elevation: 2,
    marginLeft: 10,
    padding: 15,
    borderRadius: 19,
    alignItems: 'center',
  },
  transferButton: {
    backgroundColor: '#ff9800',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  transactionsButton: {
    //backgroundColor: '#03a9f4',
    //backgroundColor: '#CCE5FF',
    backgroundColor: '#FFFFFF',
    flex: 1,
    //elevation: 2,
    //marginLeft: 10,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  actionText: {
    //color: '#fff',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summarySection: {
    margin: 6,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  summaryText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  balanceText: {
    fontWeight: 'bold',
  },
  transactionType: {
    fontWeight: 'bold',
  },
  recentTransactions: {
    margin: 6,
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 5,
  },
  amount: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 25,
    backgroundColor: '#03a9f4',
    borderRadius: 30,
    elevation: 8,
  },
});

export default App;
