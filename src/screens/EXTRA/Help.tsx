import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons'

const HelpComponent = ({onPressBack}) => {
  return (
    <View style={{height: '100%'}}> 


      <View style={styles.header1}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={onPressBack}>
                <Ion name='arrow-back-outline' size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer}>
                
                <Text style={styles.title}>Help</Text>
              </TouchableOpacity>

              
        </View>



        <ScrollView style={styles.container}>
     

     <View style={styles.helpMailSection}>
     <Text style={styles.header}>Kindly read the frequently asked questions below before sending the email</Text>
   <TouchableOpacity style={styles.button}>
     <Text style={styles.buttonText}>SEND EMAIL</Text>
   </TouchableOpacity>
     </View>
   
   
   <View style={styles.section}>
     <Text style={styles.sectionHeader}>How to take the backup?</Text>
     <Text style={styles.sectionContent}>
       When you enable google drive backup and restore then your data is automatically saved in your google drive folder at every time you use the app. You can check the last backup time in the backup and restore page. This is the recommended way of taking backup as it automatically saves your data as you do not have to keep taking the backup manually. If for some reason the automatic backup stops then the app even reminds you to do the backup.
       {'\n\n'}You can also go to the backup and restore page and select from drop down multiple to save all the expenses together in one go manually. You can also save the backup data folder directly on sdcard locally in your phone. After saving the data, the app gives you an option to share the data file through Email. You can send this file to another device or save it in your mail.
     </Text>
   </View>
   
   <View style={styles.section}>
     <Text style={styles.sectionHeader}>How to restore the data if I change my phone or uninstall the app?</Text>
     <Text style={styles.sectionContent}>
       If you had enabled Google drive backup and restore in your previous phone then simply login to the same Google account and your data will be transferred. This option is automatic.
       {'\n\n'}You can also go to the backup and restore page and select from drop down multiple to restore all the expenses together in one go manually. Select the last backup from your Google drive account or from your sdcard folder.
       {'\n\n'}Both these options will work only if you have enabled Google drive backup and restore in your previous phone. Please make sure that you keep the app data safe on your Google drive so that it can be restored in new phone. All your app data will be stored in your Google drive account. If you do not enable this option then data will remain in your phone and will be deleted when you delete the app. You will not lose any data.
     </Text>
   </View>

   
   
   <View style={styles.section}>
     <Text style={styles.sectionHeader}>How to generate pdf or excel report?</Text>
     <Text style={styles.sectionContent}>
       In transaction page, select the report option from the top menu. choose pdf or excel, grant storage permission and give access to download folder in your device. The report will be generated.
     </Text>
   </View>

   

 </ScrollView>

    </View>
    
    
  );
};

const styles = StyleSheet.create({
    helpMailSection: {
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#B5E5F9',
        gap: 6
    },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 16,
    flex: 5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {

    flex: 2,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    padding: 10,
    borderWidth: .2,
    borderRadius: 8,
    borderColor: 'blue',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
  },

  header1:{
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
});

export default HelpComponent;
