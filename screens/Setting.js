import React ,{useState,useEffect}from "react";
import { View, Text,StyleSheet,Image,FlatList } from "react-native";
import { Button } from "react-native-paper";
import {useMyContextController} from '../provider'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import { PermissionsAndroid } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";
function Setting() {
    const navigation = useNavigation();
    const [img, setImg] = useState('')

    const [{ userLogin }] = useMyContextController();

    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
          const result = await launchImageLibrary({mediaType:'photo',cameraType:'back'})
          setImg(result.assets[0].uri);
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
  if (!userLogin) {
    return <Text>Người dùng chưa đăng nhập</Text>;
  }
  //log out
  const handleLogout = async () => {
    try {
      // Kiểm tra xem có người dùng đang đăng nhập không
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
        // Thực hiện các hành động cần thiết sau khi đăng xuất
        navigation.navigate('Login'); // Điều hướng đến trang đăng nhập sau khi đăng xuất
      } else {
        console.warn('Không có người dùng đang đăng nhập.');
      }
    } catch (error) {
      console.error('Đăng xuất thất bại:', error.message);
    }
  };
  // Lấy thông tin name từ userLogin
  const { name,phonNumber,role } = userLogin;

 
  const personalInfo = [
    { key: 'Họ và tên', value: name },
    { key: 'Số điện thoại', value: phonNumber },
    { key: 'Quyền', value: role },
  ];
    return ( 
        <View style={styles.container}>
            <View style={styles.wraperImg}>
                <View style={{marginLeft:20,marginRight:30}}>
                  {img ? (<Image 
                  style={styles.img}
                   source={{uri:img}}/>)
                  :(<Image source={require('../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzctYWV3LTE2NS5qcGc.png')} style={styles.img}/>)}
                  
                   <TouchableOpacity onPress={()=>{requestCameraPermission()}} style={{backgroundColor:'#e06464',height:50,width:100,justifyContent:'center',alignItems:'center',borderRadius:10,marginLeft:30}}>
                      <Text style={{color:'#fff'}}>Chọn ảnh</Text>
                   </TouchableOpacity>
                </View>
                 <View>
                     <Text style={styles.txt}>{name}</Text>
                     <Button mode="contained" style={styles.btn} onPress={handleLogout}>Log out</Button>
                 </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.txt}>Thông tin cá nhân</Text>
                <FlatList
          data={personalInfo}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.txtList}>{item.key}: {item.value}</Text>
            </View>
          )}
        />
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    wraperImg:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#ccc',
    },
    img:{
      width:150,
      height:150,
      borderRadius:300,
      marginBottom:10,
      marginTop:10
    },
    info:{
        paddingLeft:10,
        marginTop:10
    },
    txt:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10,
        color:'#000',
    },
    btn:{
        height:40,
        width:200,
        borderRadius:10,
        backgroundColor:'#e06464'
    },
    txtList:{
        marginLeft:5,
        fontSize:16,
        padding:10,
        color:'#000'
    }

})
export default Setting;

