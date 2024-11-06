import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dataStore from '../resources/data/dataStore.json';

const PaymentMethodChart = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [paymentTotals, setPaymentTotals] = useState({});

  const transactions = dataStore.Transactions;

  useEffect(() => {
    calculatePaymentTotals();
  }, [transactions]);

  const calculatePaymentTotals = () => {
    const totals = {};
    
    transactions.forEach(transaction => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method Chart</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PaymentMethodChart;
