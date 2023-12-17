import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import BookComponent from "../components/BookComponent";
import { ScrollView } from "react-native-gesture-handler";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await firestore().collection("BookService").get();

        const transactionData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nameCus: data.fullName || "N/A",
            phone: data.phoneNumber || "N/A",
            nameSer: data.serviceName || "N/A",
            priceSer: data.servicePrice || 0,
            date: data.bookingDate || "N/A",
          };
        });

        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000", marginBottom: 10 }}>Thông tin đặt dịch vụ</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookComponent
            nameCus={item.nameCus}
            phone={item.phone}
            nameSer={item.nameSer}
            priceSer={item.priceSer}
            date={item.date ? item.date.toDate().toLocaleString() : "N/A"}

          />
        )}
      />
    </View>
  );
}

export default Transaction;
