import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FirstScreen from '../FirstScreen'
import CourseDetailScreen from '../CourseDetailScreen'
import WatchLessons from '../WatchLessons'

const Stack=createStackNavigator()
export default function FirstScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='FirstScreen' component={FirstScreen}/>
      <Stack.Screen name='course-detail' component={CourseDetailScreen}/>
      <Stack.Screen name='watch-lesson' component={WatchLessons}/>
    </Stack.Navigator>
  )
}