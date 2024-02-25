import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../Screens/Utils/Colors'
export default function SectionHeading({heading}) {
  return (
    <View style={{marginBottom:5, marginTop:5}}>
    <Text style={{ borderRadius:15, fontSize:26, 
      fontFamily:'Outfit-Bold',
       color:Colors.PRIMARY, }}>{heading}</Text>
       </View>
  )
}