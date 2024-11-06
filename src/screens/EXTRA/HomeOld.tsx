import React,{useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
//import { useNavigation } from '@react-navigation/native';
const App = () => {

  //const navigation = useNavigation()
/*
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}} onPress={toggleDrawer}>
                <Ion
              name="menu"
              size={25}
              color="black"
              backgroundColor="transparent"
              
            />
            </TouchableOpacity>
            
          ),
        });
      }, [navigation]);

      const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        Animated.timing(drawerAnimation, {
          toValue: isDrawerOpen ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

      */
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const handleAddBtnClick = () => {
        setIsAddBtnClicked(!isAddBtnClicked)
            
    }
    const AddBtnContent = () =>{
        return(
            <View style={{alignItems: 'flex-end' , justifyContent: 'flex-end', position: 'absolute', bottom: 100, right: 50, width: 180, height: 300,gap: 16 }}>
                <View style={{marginRight: 0 ,width: 120, flexDirection: 'row', right: 0, gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{right: 0, color: 'white', backgroundColor: "#2196F3", padding: 10, borderRadius: 5}}>Transactions</Text>
                    <TouchableOpacity>
                        <Ion style={{backgroundColor: '#2196F3', padding: 5, borderRadius: 25}} color="white" name="list-outline" size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginRight: 0, width: 120, flexDirection: 'row', right: -26, gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: 'white', backgroundColor: "#FE5722", padding: 10, borderRadius: 5}}>Transfer</Text>
                    <TouchableOpacity>
                        <Ion style={{backgroundColor: '#FE5722', padding: 5, borderRadius: 25}} color="white" name="repeat" size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={{width: 120, flexDirection: 'row',  right: -2, gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: 'white', backgroundColor: "#4BAE51", padding: 10, borderRadius: 5}}>Add Income</Text>
                    <TouchableOpacity>
                        <Ion style={{backgroundColor: '#4BAE51', padding: 5, borderRadius: 25}} color="white" name="add-circle-outline" size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={{width: 120, flexDirection: 'row', right: 4, gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: 'white', backgroundColor: "#FE0000", padding: 10, borderRadius: 5}}>Add Expense</Text>
                    <TouchableOpacity>
                        <Ion style={{backgroundColor: '#FE0000', padding: 5, borderRadius: 25}} color="white" name="remove-circle-outline" size={40}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
        
    } 
  return (
    <ScrollView style={styles.container}>
      

     

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.incomeButton, styles.fourButtons]}>
          <Ion name="add-circle-outline" size={40} color="white"/>
          <Text style={styles.actionText}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.expenseButton, styles.fourButtons]}>
        <Ion name="remove-circle-outline" size={40} color="white"/>
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.transferButton, styles.fourButtons]}>
        <Ion name="repeat" size={40} color="white"/>
          <Text style={styles.actionText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.transactionsButton, styles.fourButtons]}>
        <Ion name="list" size={40} color="white"/>
          <Text style={styles.actionText}>Transactions</Text>
        </TouchableOpacity>
      </View>

      

      <View style={styles.summarySection}>
        <Text style={styles.summaryText}>01-Jul-2024 -> 31-Jul-2024</Text>
        <View style={styles.balanceRow}>
            <View style={styles.containText}>
            <Text style={styles.balanceText}>Income</Text>
            <Text style={styles.balanceText}>20,000</Text>
            </View>

            <View style={styles.containText}>
            <Text style={styles.balanceText}>Expense</Text>
            <Text style={styles.balanceText}>10,000</Text>
            </View>

            <View style={styles.containText}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.balanceText}>10,000</Text>
            </View>
          
          
        </View>
        <View style={[styles.balanceRow, styles.balanceRow2]}>
            <View style={styles.pbb}>
            <Text style={[styles.balanceText, {marginRight:10}]}>Previous Balance</Text>
            <Text style={styles.balanceText}>10000</Text>
            </View>
            <View style={styles.pbb}> 
            <Text style={[styles.balanceText, {marginRight:10}]}>Balance</Text>
            <Text style={styles.balanceText}>10,100</Text>
            </View>
          
        </View>
      </View>

      <View style={styles.recentTransactions}>
        <Text style={styles.sectionHeader}>Recent Transactions</Text>
        <View style={styles.transaction}>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.textColor]}>Fri, 12 Jul 2024</Text>
                <Text style={[styles.paymentMethodText, styles.textColor]}>Card</Text>
            </View>
          
          <Text style={styles.textColor}>Air Tickets</Text>
          
          <Text style={[styles.amount, styles.textColor]}>10,000</Text>
        </View>
        <View style={styles.transaction}>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.textColor]}>Fri, 12 Jul 2024</Text>
                <Text style={[styles.paymentMethodText, styles.textColor]}>Card</Text>
            </View>
          
          <Text style={styles.textColor}>Air Tickets</Text>
          
          <Text style={[styles.amount, styles.textColor]}>10,000</Text>
        </View>
        <View style={styles.transaction}>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.textColor]}>Fri, 12 Jul 2024</Text>
                <Text style={[styles.paymentMethodText, styles.textColor]}>Card</Text>
            </View>
          
          <Text style={styles.textColor}>Air Tickets</Text>
          
          <Text style={[styles.amount, styles.textColor]}>10,000</Text>
        </View>
        <View style={styles.transaction}>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.textColor]}>Fri, 12 Jul 2024</Text>
                <Text style={[styles.paymentMethodText, styles.textColor]}>Card</Text>
            </View>
          
          <Text style={styles.textColor}>Air Tickets</Text>
          
          <Text style={[styles.amount, styles.textColor]}>10,000</Text>
        </View>
      </View>

        {isAddBtnClicked && AddBtnContent()}
      <TouchableOpacity onPress={handleAddBtnClick} style={styles.fab}>
        {!isAddBtnClicked ? <Icon name="add" size={30} color="#fff" /> : <Icon name="close" size={30} color="#fff" />}
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    textColor:{
        color: 'black'
    },
    paymentMethodText: {
        padding: 2,
        marginTop:5, 
        paddingHorizontal: 5,
        borderWidth: .4,
        borderColor: 'gray',
        
        
    },
    balanceRow2:{
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    containText:{
        borderWidth: .5,
        flex: 3,
        alignItems: 'center',
        padding: 10
    },
    pbb:{
        paddingVertical: 4,
        paddingHorizontal: 4,
        width: '100%',
        flexDirection: 'row',
        textAlign: 'right',
        alignSelf: 'flex-end',
        justifyContent:'flex-end',
        
        borderBottomWidth: .5
    },
  container: {
    padding: 2,
    
    
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 10,
  },
  backupSection: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backupButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  skipButton: {
    padding: 10,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 5,
  },
  enableButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 6,
  },
  incomeButton: {
    backgroundColor: '#4caf50',
    flex: 1,
    
    
    borderRadius: 5,
    alignItems: 'center',
  },
  fourButtons:{
    paddingHorizontal: 15,
    paddingVertical:25,
  },
  expenseButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginLeft: 10,
    padding: 15,
    borderRadius: 5,
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
    backgroundColor: '#03a9f4',
    flex: 1,
    marginLeft: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginBottom: 10,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  amount: {
    color: '#f44336',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03a9f4',
    borderRadius: 30,
    elevation: 8,
  },
});

export default App;
