import react, {useState} from 'react'
import { View, Text, Switch, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';


import settingsData from '../resources/settingsData.json'



  
const Settings = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [toggleStates, setToggleStates] = useState({})
    const handleToggle = (id) => {
        setToggleStates(pState => ({
            ...pState,
            [id]: !pState[id]
        }))
    };
  
    const handleModalOpen = () => {
      
      setModalVisible(true);
    };
  
    const handleModalClose = () => {
     
      setModalVisible(false);
    };

    const renderOption = (option) => {
        switch(option.type){
            case 'modal':
                return(
                    <TouchableOpacity  style={styles.optionContainer2} key={option.id} onPress={handleModalOpen}>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </TouchableOpacity>
                )
            case 'toggle':
                return (
                    <View style={styles.toggleOptionContainer} key={option.id}>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                        <Switch
                        value={toggleStates[option.id]} 
                        onValueChange={() => handleToggle(option.id)}
                        />
                    </View>
                );
        default:
            return null;
        }
    }

    return(

        <View style={styles.container}>
            {settingsData.map(option => renderOption(option))}

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Modal Content</Text>
            <Button title="Close Modal" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    optionContainer2:{
        //backgroundColor: 'red',
        padding: 11,
        borderBottomWidth:.3,
      borderColor: 'gray',
    },
    container: {
      flex: 1,
      
      backgroundColor: '#fff',
    },
    optionLabel: {
      fontSize: 18,
      
    },
    toggleOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor: 'blue',
      justifyContent: 'space-between',
      borderBottomWidth:.3,
      borderColor: 'gray',
      padding: 11,
      
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      minWidth: 300,
    },
  });

export default Settings