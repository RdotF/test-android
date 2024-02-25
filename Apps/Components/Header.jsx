import { View, Text, Image, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Screens/Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
	return (
		<>
			<View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
				<Image
					source={require('../../assets/images/Flag_of_Germany.svg.png')}
					style={{ width: 45, height: 45, borderRadius: 99 }}
				/>
				<View>
					<Text style={{ fontSize: 24, fontFamily: 'Outfit-Bold' }}>GER</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: Colors.WHITE,
		padding: 8,
		borderRadius: 99,
		paddingHorizontal: 20,
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		gap: 35,
		alignItems: 'center',
		// borderWidth: 0.4,
	},
});
