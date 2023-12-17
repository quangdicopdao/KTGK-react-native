import React from "react";
import { View,Text,Image,TouchableOpacity } from "react-native";

function BookComponent({nameCus,phone,nameSer,priceSer,date}) {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength - 3) + '...';
        }
        return text;
      };
    return ( 
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:10,borderColor:'#e06464',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10,marginBottom:10}}>
            <Image source={require('../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzctYWV3LTE2NS5qcGc.png')} 
            style={{
                height:100,
                width:100
            }}/>
            <View>
                <Text style={{fontSize:16,color:'#000',marginBottom:10}}>Tên khách hàng: {truncateText(nameCus, 20)}</Text>
                <Text style={{fontSize:16,color:'#000',marginBottom:10}}>Số điện thoại: {truncateText(phone, 20)}</Text>
                <Text style={{fontSize:16,color:'#000',marginBottom:10}}>Tên dịch vụ: {truncateText(nameSer, 20)}</Text>
                <Text style={{fontSize:16,color:'#000',marginBottom:10}}>Gía dịch vụ: {truncateText(priceSer, 20)}</Text>
                <Text style={{fontSize:16,color:'#000',marginBottom:10}}>Ngày hẹn: {truncateText(date, 20)}</Text>
            </View>
        </TouchableOpacity>
     );
}

export default BookComponent;