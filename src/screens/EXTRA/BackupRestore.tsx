import react from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons' 
const BackupRestore = () => {


    const showAlert = () => {
        Alert.alert(
          'Confirmation',
          'Do you want to proceed?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => console.log('Yes Pressed') },
          ],
          { cancelable: false }
        );
      };
    
    return(

        <View style={styles.container}>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='cloud-upload' size={26} style={{}} color='#2196F3'/>

                <Text style={styles.optionLabel}>Export to Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='cloud-download' size={26} style={{}} color='#2196F3'/>

                <Text style={styles.optionLabel}>Import from Google Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='arrow-up-outline' size={26} style={{}} color='#2196F3'/>

                <Text style={styles.optionLabel}>Backup Data</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='arrow-down-outline' size={26} style={{}} color='#2196F3'/>
                <View style={{justifyContent: 'center'}}>
                <Text style={styles.optionLabel}>Restore Data </Text>
                <Text >Select .db database file</Text>
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='enter-outline' size={26} style={{}} color='#2196F3'/>

                <Text style={styles.optionLabel}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optionContainer2}  onPress={showAlert}>
            <Ion name='repeat' size={26} style={{}} color='#2196F3'/>

                <Text style={styles.optionLabel}>Last Backup</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    optionContainer2:{
        flexDirection: 'row',
        gap: 16,
        //backgroundColor: 'red',
        alignItems: 'center',
        padding: 11,
        borderBottomWidth:.3,
      borderColor: 'gray',
    },
    optionLabel: {
        color: 'black',
        fontSize: 18,
        
      },
    container: {
      flex: 1,
      
      backgroundColor: '#fff',
    },
})
export default BackupRestore