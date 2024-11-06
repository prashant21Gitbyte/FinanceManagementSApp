import react from 'react'
import {Text,View, StyleSheet, TouchableOpacity} from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'
import CustomTabs from '../components/ReminderTabs'
import ReminderCard from '../components/ReminderCard'

const Tab1Screen = () => (
    
    <View style={styles.screen}>
      {/**
       * 
       * <View style={styles.headingsContainer}><Text>Hellow</Text></View>
      <Text></Text>
       */}
       <View style={{ padding: 6, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20}}>
        <View>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>Date</Text>


        </View>
        <Text>Account</Text>
        <Text>Category</Text>
        <Text>Amount</Text>
      </View>

       <ReminderCard />
      
    </View>
  );
  
  const Tab2Screen = () => (
    <View style={styles.screen}>
    {/**
     * 
     * <View style={styles.headingsContainer}><Text>Hellow</Text></View>
    <Text></Text>
     */}
     <View style={{ padding: 6, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20}}>
      <View>
      <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>Date</Text>


      </View>
      <Text>Account</Text>
      <Text>Category</Text>
      <Text>Amount</Text>
    </View>

     <ReminderCard />
    
  </View>
  );


const Reminder = ({onPressBack}) => {

    const tabs = [
        { title: 'Today', component: <Tab1Screen /> },
        { title: 'All', component: <Tab2Screen /> },
      ];

    
    return(
        <View style={{ height: '100%'}}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={onPressBack}>
                <Ion name='arrow-back-outline' size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer}>
                
                <Text style={styles.title}>Reminders</Text>
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
          
         
        </View>
        
    )
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        
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

export default Reminder