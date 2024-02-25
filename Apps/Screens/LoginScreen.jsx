import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from './Utils/Colors'
import HomeScreen from './HomeScreen'


export const LoginScreen = ({navigation}) => {
  return (
    <View>
      <Image source={require('./../../assets/images/rocket.jpg')}
        style={{
          width:'100%',
          height:400,
          objectFit:'cover'
        }}
      />
      <View style={{padding:20}}>
        <Text style={{fontSize:45, fontWeight:'bold' }}>
        Welcome To
          <Text style={{color:Colors.PRIMARY}}> MyApp</Text>
        </Text>
        <Text style={{fontSize:22, marginTop:9, color:Colors.GRAY}}> It helps you learn in a fun way</Text>
     {/* Button section */}
     
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
            <Text style={{textAlign:'center', color:Colors.WHITE,
          fontSize: 18, }}> Start</Text>
          </TouchableOpacity>
        {/* Button section */}
        <Text style={{marginTop:20, color:Colors.PRIMARY, 
          textAlign:'center', marginRight:-10}}>made by Tsareva Maria</Text>
      </View>
    </View>
  )
}
export default LoginScreen;


const styles = StyleSheet.create({
      button:{
        padding:16,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:60,
      }
})