import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashCardApp from '../FlashCardApp';
import ProfileScreen from '../ProfileScreen';
import FirstScreen from '../FirstScreen';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import FirstScreenNavigation from './FirstScreenNavigation';
import FlashCardNavigation from './FlashCardNavigation';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
			{/* Default */}
			<Tab.Screen
				name="Home"
				component={FirstScreenNavigation}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
					tabBarLabel: ({ color }) => <Text style={{ color, marginBottom: 2 }}>Home</Text>,
				}}
			/>
			{/* Default */}
			<Tab.Screen
				name="FlashCardApp"
				component={FlashCardNavigation}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
					tabBarLabel: ({ color }) => <Text style={{ color, marginBottom: 2 }}>Study</Text>,
				}}
			/>
			<Tab.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} />,
					tabBarLabel: ({ color }) => <Text style={{ color, marginBottom: 2 }}>Progress</Text>,
				}}
			/>
		</Tab.Navigator>
	);
}
