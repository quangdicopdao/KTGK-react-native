import React, { useState } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import DatePicker from 'react-native-date-picker'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";

function BookService({ route }) {
  const navigation = useNavigation()
  const { nameSer, priceSer } = route.params;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
 
  const saveBookingToFirestore = async () => {
    try {
      await firestore().collection('BookService').add({
        serviceName: nameSer,
        servicePrice: parseInt(priceSer),
        fullName: fullName,
        phoneNumber: phoneNumber,
        bookingDate: date,
        // Add other fields if needed
      });
      console.log('Booking saved to Firestore successfully!');
      Alert.alert('Thông báo', 'Đặt dịch vụ thành công!')
      navigation.goBack()
    } catch (error) {
      console.error('Error saving booking to Firestore:', error);
    }
  };
  
  console.log(date)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông tin dịch vụ</Text>
      <TextInput
        editable={false}
        style={styles.input}
        value={nameSer}
      />
      <TextInput
        editable={false}
        style={styles.input}
        value={parseInt(priceSer).toString()}
      />
      <Text style={styles.header}>Thông tin người đặt dịch vụ</Text>
      <TextInput
        placeholder="Họ và tên"
        style={styles.input}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        placeholder="Số điện thoại"
        keyboardType="numeric"
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Text style={styles.header}>Chọn ngày</Text>
      <Text style={{fontSize:15,color:'#000',marginBottom:10}}>Ngày đặt: {date.toLocaleString()}</Text>

      <Button mode="contained" onPress={()=> setOpen(true)} style={styles.btn}>
          Chọn ngày
      </Button>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      {/* <DatePicker date={date} onDateChange={setDate} /> */}
          <Button mode="contained"  style={styles.btn} onPress={saveBookingToFirestore}>
        Đặt dịch vụ
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btn:{
    borderRadius:10,
    marginBottom:10,
    backgroundColor:'#e06464'
  }
});

export default BookService;
