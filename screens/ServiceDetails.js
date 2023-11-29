import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

function ServiceDetails() {
    return ( 
        <View style={styles.container}>
            <Text style={styles.txt}>Service name: 
                <Text style={styles.valueText}>Chăm sóc da mặt và dưỡng ẩm tự nhiên</Text>
            </Text>
            <Text style={styles.txt}>Price: 
                <Text style={styles.valueText}>250 000đ</Text>
            </Text>
            <Text style={styles.txt}>Creator: 
                <Text style={styles.valueText}>Hung</Text>
            </Text>
            <Text style={styles.txt}>Time: 
                <Text style={styles.valueText}>12/03/2023</Text>
            </Text>
            <Text style={styles.txt}>Final Update: 
                <Text style={styles.valueText}>12/03/2023</Text>
            </Text>
        </View>
     );
}

const  styles = StyleSheet.create({
    container:{
        flex:1
    },
    txt:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:10,
        color:'#000',
        marginLeft:10
    },
    valueText:{
        fontWeight:'normal'
    }
})

export default ServiceDetails;