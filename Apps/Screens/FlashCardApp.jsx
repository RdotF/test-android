// FlashCardApp.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useNavigation } from '@react-navigation/native';
import FlashcardUnitForm from '../Components/FlashcardUnitForm';
import WordForm from '../Components/WordForm';
import Colors from '../Screens/Utils/Colors';
import SectionHeading from '../Components/SectionHeading';

const FlashCardApp = () => {
	const [units, setUnits] = useState([]);
	const [currentUnit, setCurrentUnit] = useState('');
	const [showWordForm, setShowWordForm] = useState(false);
	const db = useSQLiteContext();
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUnits = async () => {
			try {
				const result =
					db &&
					(await db.getAllAsync(
						`SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'Flashcard_%';`,
					));
				setUnits(result.map((row) => row.name.replace('Flashcard_', '')));
			} catch (error) {
				console.error(error);
			}
		};

		fetchUnits();
	}, [db]);

	const handleCreateUnit = (unitName) => {
		setUnits([...units, unitName]);
		setCurrentUnit(unitName);
		setShowWordForm(true);
	};

	const handleChooseUnit = (unitName) => {
		setCurrentUnit(unitName);
		setShowWordForm(true);
	};

	const handleReview = (unitName) => {
		navigation.navigate('FlashcardReview', { unitName });
	};

	const handleDeleteUnit = async (unitName) => {
		try {
			await db.execAsync(`DROP TABLE IF EXISTS Flashcard_${unitName};`);
			setUnits(units.filter((unit) => unit !== unitName));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 40 }}>
			{currentUnit ? (
				<>
					<Text style={{ fontFamily: 'Outfit-Bold', fontSize: 24, marginBottom: 20 }}>
						{currentUnit} {''}
					</Text>
					<TouchableOpacity
						onPress={() => handleReview(currentUnit)}
						style={{
							backgroundColor: Colors.GREEN,
							padding: 15,
							borderRadius: 10,
							width: '80%',
							alignItems: 'center',
							marginTop: 20,
							marginBottom: 5,
						}}
					>
						<Text
							style={{
								color: Colors.WHITE,
								fontFamily: 'Outfit-SemiBold',
								fontSize: 16,
							}}
						>
							Review
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setCurrentUnit('')} style={buttonStyles.secondary}>
						<Text style={buttonStyles.text}>Go Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleDeleteUnit(currentUnit)}
						style={buttonStyles.delete}
					>
						<Text style={{ color: Colors.GRAY, fontFamily: 'Outfit-Bold', fontSize: 16 }}>
							Delete Unit
						</Text>
					</TouchableOpacity>
					{showWordForm && <WordForm unitName={currentUnit} />}
				</>
			) : (
				<>
					<Text
						style={{
							fontFamily: 'Outfit-Bold',
							fontSize: 32,
							marginBottom: 25,
							letterSpacing: 1,
							textAlign: 'center',
						}}
					>
						Study Flashcards
					</Text>
					<SectionHeading heading={'Choose a Unit'} />
					{units.map((unit) => (
						<TouchableOpacity
							key={unit}
							onPress={() => handleChooseUnit(unit)}
							style={buttonStyles.unit}
						>
							<Text style={{ color: Colors.WHITE, fontFamily: 'Outfit-Medium', fontSize: 20 }}>
								{unit}
							</Text>
						</TouchableOpacity>
					))}
					<View style={{ marginTop: 30 }}>
						<FlashcardUnitForm onCreateUnit={handleCreateUnit} />
					</View>
				</>
			)}
		</ScrollView>
	);
};

const buttonStyles = {
	primary: {
		backgroundColor: Colors.PRIMARY,
		padding: 15,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 5,
	},
	secondary: {
		backgroundColor: Colors.GRAY,
		padding: 15,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
		marginBottom: 10,
	},
	delete: {
		padding: 15,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
		marginBottom: 10,
	},
	unit: {
		backgroundColor: Colors.GREEN,
		padding: 15,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
		marginTop: 10,
	},
	text: {
		color: Colors.WHITE,
		fontFamily: 'Outfit-SemiBold',
		fontSize: 16,
	},
};

export default FlashCardApp;
