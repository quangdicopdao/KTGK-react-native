import React ,{useState,useEffect}from "react";
import { View, Text,FlatList,Image,TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';

function Customer() {
    const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('CUSTOMER').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);
    return ( 
        <View style={{flex:1}}>
            <Text style={{fontSize:20,fontWeight:'bold', marginLeft:10,marginBottom:10,color:'black',marginTop:10}}>Danh sách khách hàng</Text>
            <FlatList
        data={customerData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={{borderRadius:10,marginTop:20, 
            backgroundColor:'#fff',marginLeft:10,marginRight:10,
            borderColor:'#e06464',padding:20,flexDirection:'row',alignContent:'center',
            borderRadius:10,
            borderWidth:1,
            borderColor:'#e06464'
        }
        }>
            <Image source={require('../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzctYWV3LTE2NS5qcGc.png')} style={{width:60,height:60,marginRight:50}}/>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#e06464',alignSelf:'center'}}>{item.name}</Text></TouchableOpacity>
        )}
      />
        </View>
     );
}

export default Customer;