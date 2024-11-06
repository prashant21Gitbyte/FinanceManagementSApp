import { format, parseISO, isWithinInterval } from 'date-fns';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const processData = (transactions, selectedRange) => {
  if (!selectedRange){


    const categories = {};

  transactions.forEach(transaction => {
    
    
      const category = transaction.category;
      const amount = parseFloat(transaction.amount);

      if (!categories[category]) {
        categories[category] = { income: 0, expense: 0 };
      }

      if (transaction.transactionType === 'income') {
        categories[category].income += amount;
      } else if (transaction.transactionType === 'expense') {
        categories[category].expense += amount;
      }
    
  });

    return categories;
    //return {};

  } 

  const { startDate, endDate } = selectedRange;
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  // Initialize category objects for income and expenses
  const categories = {};

  transactions.forEach(transaction => {
    const transactionDate = parseISO(transaction.date);
    if (isWithinInterval(transactionDate, { start, end })) {
      const category = transaction.category;
      const amount = parseFloat(transaction.amount);

      if (!categories[category]) {
        categories[category] = { income: 0, expense: 0 };
      }

      if (transaction.transactionType === 'income') {
        categories[category].income += amount;
      } else if (transaction.transactionType === 'expense') {
        categories[category].expense += amount;
      }
    }
  });

  return categories;
};

const calculateChartData = (categories, chartType) => {
  const chartData = [];

  if (chartType === 'overall') {
    // Aggregate total income and expense for each category
    Object.keys(categories).forEach(category => {
      const totalIncome = categories[category].income;
      const totalExpense = categories[category].expense;
      const netAmount = totalIncome - totalExpense;
      console.log(netAmount)
      if (netAmount <= 0){
        return
      }
      // Push to chartData if netAmount is not zero
      if (netAmount !== 0) {
        chartData.push({
          name: category,
          amount: netAmount,
          color: getRandomColor(), // Utility function to generate random color
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        });
      }
    });
  } else {
    Object.keys(categories).forEach(category => {
      const amount = chartType === 'income' ? categories[category].income : categories[category].expense;
      if (amount > 0) {
        chartData.push({
          name: category,
          amount: amount,
          color: getRandomColor(), // Utility function to generate random color
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        });
      }
    });
  }

  return chartData;

  

/* code before for just individual expense and income 
  const chartData = [];
  Object.keys(categories).forEach(category => {
    const amount = chartType === 'income' ? categories[category].income : categories[category].expense;
    if (amount > 0) {
      chartData.push({
        name: category,
        amount: amount,
        color: getRandomColor(), // Utility function to generate random color
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      });
    }
  });
  return chartData;

  */
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DonutChart = ({ transactions, selectedRange, chartType }) => {
    //console.log("transactions in donut", transactions, selectedRange, chartType)
  const categories = processData(transactions, selectedRange);
  const chartData = calculateChartData(categories, chartType);
    //console.log("categories", categories)
    //console.log("chartDtat", chartData)
  return (
    <View>
      <PieChart
        data={chartData}
        width={width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text style={{marginBottom: 15, fontSize: 19, marginTop:16 }}>{chartType === 'income' ? 'Income' : 'Expense'} by Category</Text>

        <View style={{}}>
        {chartData?.map((item, index) => {
        return(
          <View style={styles.summaryTextItemContainer} key={index}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>


            <View style={{marginTop: 10, marginBottom: 10,borderRadius: 10 ,backgroundColor: `${item.color}`, width: 20, height: 20}}></View>
            <Text style={{width: 150, }}>{item.name}</Text>
            </View>
            
            <Text style={{ fontWeight: 'bold'}}>{item.amount}</Text>
                
          </View>
          
        )
      })}
        </View>
      
      
    </View>
  );
};

export default DonutChart;



const styles = StyleSheet.create({
  summaryTextItemContainer :{
    paddingHorizontal: 5,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
