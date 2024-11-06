import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IOcon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { useNavigation } from '@react-navigation/native';




const ExpenseDetail = ({data, onPressBackFromDetails}) => {
  //const navigation = useNavigation()

  console.log(data)

  

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBackFromDetails}>
      <IOcon name="arrow-back-outline" size={30} color="black"/>
      </TouchableOpacity>
      
      <View style={styles.header}>

        
        <Icon name="person" size={40} color="black" style={styles.icon} />
        <Text style={styles.title}>{data?.recipient}</Text>
        <Text style={styles.date}>• {data?.date}</Text>
      </View>

      
        <View style={styles.detailContainer}>
        <View style={styles.borderObj}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.valueCompleted}>● Completed</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{data.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Remark</Text>
            <Text style={styles.value}>{data?.remark}</Text>
          </View>
        </View>


        <View style={styles.borderObj}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.value}>{data.modeOfPayment}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>₹{data.amount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>
        </View>
      </View>

    
      <View style={styles.buttonContainer}>
        <TouchableOpacity >
        <IOcon name="pencil-sharp" size={26} color="white" style={[styles.icon, styles.iconAbsolute]} />

        </TouchableOpacity>
      {/*
      <Button title="Edit Expense" onPress={() => {}} ></Button>
      */}
        
        
      </View>
      
    </View>
    
  );
  
};

const styles = StyleSheet.create({
  borderObj: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 20,
    marginTop: 20
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 35
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#777',
  },
  detailContainer: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    //borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    color: '#777',
  },
  value: {
    color: '#000',
  },
  valueCompleted: {
    color: 'green',
  },
  upload: {
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 16,
    
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'red',
    
    
  },
  iconAbsolute: {
    bottom: 40,
    right: 30,
    backgroundColor: '#0970B6',
    padding: 20,
    borderRadius: 50,
    position: 'absolute',
    
  }
});

export default ExpenseDetail;
