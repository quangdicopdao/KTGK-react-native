import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

function AddService() {
  const [nameService, setNameService] = useState('');
  const [prices, setPrices] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { itemId, name, price } = route.params ?? {};

  
  useEffect(() => {
    // Check if there's an itemId passed from the Home screen
    if (itemId) {
      // If itemId is present, it's an edit operation
      const fetchData = async () => {
        try {
          const documentSnapshot = await firestore().collection('SERVICE').doc(itemId).get();
          const data = documentSnapshot.data();
          setNameService(data.name);
          setPrices(data.price.toString()); // Convert to string if it's a number
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
  }, [route.params]);
  
  const handleSaveService = async () => {
    try {
      // Check if both fields are filled
      if (!nameService || !prices) {
        alert('Please fill in all the required information.');
        return;
      }
  
      // Check if it's an edit or add operation
      if (itemId) {
        // If itemId is present, it's an edit operation
        // Update data for the given itemId
        await firestore().collection('SERVICE').doc(itemId).update({
          name: nameService,
          price: parseFloat(prices), // Convert to number if needed
        });
        alert('Service has been updated successfully.');
      } else {
        // If itemId is not present, it's an add operation
        await firestore().collection('SERVICE').add({
          name: nameService,
          price: parseFloat(prices), // Convert to number if needed
        });
        alert('Service has been added successfully.');
      }
  
      // Clear the input fields
      setNameService('');
      setPrices('');
  
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('An error occurred while saving the service. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Service name *</Text>
      <TextInput
        style={styles.txtInput}
        placeholder='Input a service name'
        value={nameService}
        onChangeText={(nameService) => setNameService(nameService)}
      />

      <Text style={styles.txt}>Price *</Text>
      <TextInput
        style={styles.txtInput}
        placeholder='0'
        value={prices}
        onChangeText={(prices) => setPrices(prices)}
        keyboardType='numeric'
      />

      <Button mode='contained' style={styles.btn} onPress={handleSaveService}>
        <Text>Lưu</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e06464',
    marginLeft: 10,
  },
  txtInput: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#e06464',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

export default AddService;
