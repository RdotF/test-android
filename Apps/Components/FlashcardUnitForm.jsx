import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import Colors from '../Screens/Utils/Colors';
import SectionHeading from './SectionHeading';

const FlashcardUnitForm = ({ onCreateUnit }) => {
	const [unitName, setUnitName] = useState('');
	const db = useSQLiteContext();

	const handleCreateUnit = async () => {
		try {
			if (unitName) {
				await db.execAsync(
					`CREATE TABLE IF NOT EXISTS Flashcard_${unitName} (id INTEGER PRIMARY KEY AUTOINCREMENT, german TEXT, english TEXT);`,
				);
				onCreateUnit(unitName);
				setUnitName('');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={{ alignItems: 'center', padding: 20 }}>
			<SectionHeading heading={'Create a new Unit'} />
			<TextInput
				placeholder="Flashcard Unit Name"
				value={unitName}
				onChangeText={setUnitName}
				style={inputStyles}
			/>
			<TouchableOpacity onPress={handleCreateUnit} style={buttonStyles.primary}>
				<Text style={buttonStyles.text}>Create Unit</Text>
			</TouchableOpacity>
		</View>
	);
};

const inputStyles = {
	backgroundColor: Colors.WHITE,
	width: Dimensions.get('window').width * 0.8,
	paddingVertical: 15, // Adjust based on the platform
	paddingHorizontal: 80,
	borderRadius: 10,
	marginBottom: 20,
	fontSize: 18,
	marginTop: 20,
};

const buttonStyles = {
	primary: {
		backgroundColor: Colors.PRIMARY,
		padding: 20,
		borderRadius: 10,
		width: Dimensions.get('window').width * 0.8,
		// height: Dimensions.get('window').height * 0.4,
		alignItems: 'center',
		marginTop: 10,
	},
	text: {
		color: Colors.WHITE,
		fontFamily: 'Outfit-Medium',
		fontSize: 18,
	},
};

export default FlashcardUnitForm;
