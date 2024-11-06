import react from 'react'
import {StyleSheet, Text, View } from 'react-native'
const ReminderCard = () => {
    return(
        <View style={styles.reminderCardContainer}>
           
            <View style={{flexDirection: 'row'}}>
                <View style={{ backgroundColor: '#04A7F7', width: 9, height: '100%'}}></View>
                <View style={{paddingVertical: 10,marginLeft: 5}}>
                    <Text style={{color: 'black'}}>Weekly, Fri</Text>
                    <Text style={{color: 'black'}}>Card</Text>
                </View>
            </View>
            <Text style={{paddingVertical: 10,marginLeft: 5, color: 'black'}}>Income Expense</Text>
            <Text style={{paddingVertical: 10,marginLeft: 5, color: 'black'}}>Business</Text>
            <Text style={{paddingVertical: 10,marginLeft: 5, color: 'black', marginRight: 20}}>20,000</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    reminderCardContainer: {
        
        backgroundColor: 'white',
        height: 70,
        width: 390,
        justifyContent: 'space-between',
        flexDirection: 'row'

    }
})
export default ReminderCard