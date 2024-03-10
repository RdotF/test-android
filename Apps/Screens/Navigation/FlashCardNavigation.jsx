import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FlashcardReview from '../FlashcardReview.jsx'; // Make sure the import is correct
import FlashCardApp from '../FlashCardApp.jsx'; // Make sure the import is correct

const Stack = createStackNavigator();

const FlashCardNavigation = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="FlashCardApp" component={FlashCardApp} />
			<Stack.Screen name="FlashcardReview" component={FlashcardReview} />
		</Stack.Navigator>
	);
};

export default FlashCardNavigation;
