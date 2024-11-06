import React from 'react';
import { useState } from 'react';
import {Modal,View, Text, ViewBase, StyleSheet , ScrollView, TextInput, TouchableOpacity, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Transfer = ({onPressBack}) => {
  
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  // for time
  const time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // Use 24-hour time format if you want to set this to false
  });
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirmTime = (time) => {
    console.log(time);
    const timeObject = new Date(time);
    const formattedTime = timeObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    });
    setSelectedTime(formattedTime);
    hideTimePicker();
  };


  // for modal from
  const setf = (nf) =>{
    setfrom(nf);
    setModalVisible(false);
  }


  const fromlist=[
    { label: '1', value: 'Bank' },
    { label: '2', value: 'Card' },
    { label: '3', value: 'Cash' },
    { label: '4 ', value: 'Other' },
  ];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(time);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromvalue,setfrom]= useState('Bank');

  return (

    <ScrollView style={styles.main}>
      <View style={styles.head}>
        <TouchableOpacity onPress={onPressBack}>
        <Icon name="arrow-back-outline" size={25} color="white" />

        </TouchableOpacity>

      <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>
          
            Transfer 
        </Text>
      </View>
        
 
        <View style={styles.box}>
            <Text style={[styles.amounttxt]}>Amount</Text>
            <TextInput style={styles.amountin} keyboardType='numeric' />
        </View>

        <View style={styles.box}>
            <Text style={styles.amounttxt}>From:</Text>
            <TouchableOpacity style={styles.a} onPress={()=>setModalVisible(true)}>
              <Text style={styles.amounttxt}>{fromvalue}  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;<Icon name="caret-down" size={20} color="black" />  &nbsp; &nbsp; </Text>
            </TouchableOpacity>

            <Text style={styles.amounttxt}>Account:</Text>
            <TouchableOpacity style={styles.a} onPress={()=>alert('Income Expense')}>
              <Text style={styles.amounttxt}>Income Expense  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;<Icon name="caret-down" size={20} color="black" />  &nbsp; &nbsp; </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.box}>
            <Text style={styles.amounttxt}>To:</Text>
            <TouchableOpacity style={styles.a} onPress={()=>setModalVisible(true)}>
              <Text style={styles.amounttxt}>{fromvalue}  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;<Icon name="caret-down" size={20} color="black" />  &nbsp; &nbsp; </Text>
            </TouchableOpacity>



            <Text style={styles.amounttxt}>Account:</Text>
            <TouchableOpacity style={styles.a} onPress={()=>alert('Income Expense')}>
              <Text style={styles.amounttxt}>Income Expense  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;<Icon name="caret-down" size={20} color="black" />  &nbsp; &nbsp; </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.box2}>
        <Text style={styles.date} onPress={showDatePicker}>{selectedDate}   &nbsp;<Icon name="calendar" size={22} color="black" /></Text>
        <Text style={styles.time} onPress={showTimePicker}>{selectedTime}   &nbsp;<Icon name="time" size={22} color="black" /></Text>
        </View>

        <View style={styles.box}>
        <TextInput style={styles.txtarea}  placeholder='Write Notes here[Optional]'/>
        </View>

        <TouchableOpacity style={styles.btn}><Text style={styles.btntxt}>TRANSFER</Text></TouchableOpacity>
       

        




      <Modal
        animationType="fix"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView} onPress={() => setModalVisible(!modalVisible)}> 
            <View>
                {fromlist.map((item)=><Text style={styles.modaltxt} onPress={()=>{setf(item.value)}}>{item.value}</Text>)}
            </View>
            {/* <TouchableOpacity 
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>



      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      

        </ScrollView>
  );
};

const styles=StyleSheet.create({
  head:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height:50,
    backgroundColor:'#4882e6',
    color:'white',
    fontSize:23,
    textAlignVertical: 'center',
    paddingStart:10,
  },

  box:{
    margin:10,
    marginBottom:0,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#8590a1',
    borderRadius:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
  },
  box2:{
    margin:10,
    marginBottom:0,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
  },
  amounttxt:{
    height:58,
    color:'black',
    fontSize:18,
    paddingStart:10,
    textAlignVertical: 'center',
    textAlign:'center',
  },
  amountin:{
    height:58,
    width:275,
    fontSize:18,
    textAlign:'center',
  },
  a:{
    height:58,
    width:275,
    fontSize:18,
    textAlign:'justify',
  },

  main:{
    backgroundColor:'#eff3f9eb',
  },
  txtarea:{
    height:58,
    fontSize:18,
  },
  btn:{
    margin:10,
    height:40,
    marginBottom:0,
    backgroundColor:'#4882e6',
    borderRadius:5,
  },
  btntxt:{
    height:40,
    color:'white',
    fontSize:18,
    textAlign:'center',
    textAlignVertical: 'center',
  },
  date:{
    height:45, 
    width:185,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#8590a1',
    borderRadius:5,
    fontSize:18,
    textAlign:'center',
    textAlignVertical: 'center',
    color:'#000'
  },
  time:{
    height:45, 
    width:165,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#8590a1',
    borderRadius:5,
    fontSize:18,
    textAlign:'center',
    textAlignVertical: 'center',
    color:'#000'
  },



  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', 
    marginTop: -270,
  },
  modalView: {
    width:250,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingStart:10,
  },
  modaltxt:{
    fontSize:18,
    color:'#000',
    padding:8,
  }
});
export default Transfer;
