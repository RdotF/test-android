import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import Colors from '../Screens/Utils/Colors';
import { Dimensions } from 'react-native';
const WordForm = ({ unitName }) => {
	const [germanWord, setGermanWord] = useState('');
	const [englishWord, setEnglishWord] = useState('');
	const db = useSQLiteContext();

	const handleAddWord = async () => {
		try {
			if (germanWord && englishWord) {
				await db.execAsync(
					`INSERT INTO Flashcard_${unitName} (german, english) VALUES ('${germanWord}', '${englishWord}');`,
				);
				setGermanWord('');
				setEnglishWord('');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={{ alignItems: 'center', padding: 20, marginTop: 30 }}>
			<TextInput
				placeholder="German Word"
				value={germanWord}
				onChangeText={setGermanWord}
				textAlignVertical={'center'}
				textAlign={'center'}
				multiline={true}
				style={{
					backgroundColor: Colors.WHITE,
					width: '80%',
					padding: 10,
					borderRadius: 10,
					marginBottom: 10,
					width: Dimensions.get('window').width * 0.8,
				}}
			/>
			<TextInput
				placeholder="English Translation"
				value={englishWord}
				onChangeText={setEnglishWord}
				textAlignVertical={'center'}
				textAlign={'center'}
				multiline={true}
				style={{
					backgroundColor: Colors.WHITE,
					width: '80%',
					padding: 10,
					borderRadius: 10,
					marginBottom: 10,
					width: Dimensions.get('window').width * 0.8,
				}}
			/>
			<TouchableOpacity
				onPress={handleAddWord}
				style={{
					backgroundColor: Colors.PRIMARY,
					padding: 15,
					borderRadius: 10,
					width: '80%',
					alignItems: 'center',
					width: Dimensions.get('window').width * 0.8,
				}}
			>
				<Text style={{ color: Colors.WHITE, fontFamily: 'Outfit-Bold', fontSize: 16 }}>
					Add Word
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default WordForm;
