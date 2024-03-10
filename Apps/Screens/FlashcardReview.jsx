import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import Colors from '../Screens/Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
const FlashcardReview = () => {
	const route = useRoute(); // Use useRoute hook to access route parameters
	const { unitName } = route.params;
	const [words, setWords] = useState([]);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [showGerman, setShowGerman] = useState(true);
	const db = useSQLiteContext();
	const navigation = useNavigation();
	useEffect(() => {
		console.log('unitName', unitName);
		const fetchWords = async () => {
			try {
				const result = db && (await db.getAllAsync(`SELECT * FROM Flashcard_${unitName};`));
				setWords(result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchWords();
	}, [db, unitName]);

	const handleNext = () => {
		setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
		setShowGerman(true); // Reset to show German translation first for the next flashcard
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const toggleTranslation = () => {
		setShowGerman((prev) => !prev);
	};

	return (
		<View style={{ alignItems: 'center', marginTop: 30 }}>
			<Text style={{ fontFamily: 'Outfit-Bold', fontSize: 32 }}>{unitName}</Text>

			{words.length > 0 && (
				<TouchableOpacity onPress={toggleTranslation}>
					<View
						style={{
							width: Dimensions.get('window').width * 0.9,
							height: Dimensions.get('window').height * 0.4,
							padding: 20,
							backgroundColor: showGerman ? Colors.PRIMARY_LIGHT : Colors.GREEN_LIGHT, // Change background color based on showGerman state
							borderRadius: 10,
							marginTop: 20,
							marginBottom: 100,
							alignItems: 'center',
							justifyContent: 'center', // Added to vertically center the text
						}}
					>
						<Text
							style={{
								fontFamily: 'Outfit-SemiBold',
								fontSize: 32,
								textAlign: 'center',
								alignSelf: 'center', // Center the text horizontally
								flex: 1,
								paddingTop: 115,
							}}
						>
							{showGerman ? words[currentWordIndex].german : words[currentWordIndex].english}
						</Text>
					</View>
				</TouchableOpacity>
			)}
			<TouchableOpacity
				onPress={() => handleNext()}
				style={{
					backgroundColor: Colors.PRIMARY,
					padding: 15,
					borderRadius: 10,
					width: '80%',
					alignItems: 'center',
					marginTop: 20,
				}}
			>
				<Text style={{ color: Colors.WHITE, fontFamily: 'Outfit-Medium', fontSize: 16 }}>Next</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => handleGoBack()}
				style={{
					backgroundColor: Colors.GRAY,
					padding: 15,
					borderRadius: 10,
					width: '80%',
					alignItems: 'center',
					marginTop: 10,
				}}
			>
				<Text style={{ color: Colors.WHITE, fontFamily: 'Outfit-Medium', fontSize: 16 }}>
					Go Back
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FlashcardReview;
