import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import ListComponent from "../components/Listcomponent";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";
function UserService() {

    const [services, setServices] = useState([]);
    const navigation = useNavigation()
    useEffect(() => {
      const getServices = async () => {
        try {
          const serviceCollection = firestore().collection("SERVICE");
          const snapshot = await serviceCollection.get();
  
          // Xử lý dữ liệu snapshot và lưu vào state
          const servicesData = snapshot.docs.map((doc) => doc.data());
          setServices(servicesData);
        } catch (error) {
          console.error("Error getting services:", error);
        }
      };
  
      // Gọi hàm để lấy dữ liệu khi component mount
      getServices();
    }, []); // Thêm mảng rỗng để đảm bảo hàm chỉ chạy một lần khi component mount
  
  
    return ( 
        <View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/logo-spa.png')} style={{width:200, height:200}}/>
            </View>
            <Text style={{fontSize:20,fontWeight:'bold', color:'#000',marginLeft:10}}>Danh sách dịch vụ</Text>
            {services.map((service, index) => (
        <ListComponent key={index} title={service.name} price={service.price}  onClick={()=>{navigation.navigate('BookSevice',{nameSer:service.name,priceSer:service.price})}}/>
      ))}
        </View>
     );
}

export default UserService;