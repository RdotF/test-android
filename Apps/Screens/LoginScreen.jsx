import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from './Utils/Colors';
import HomeScreen from './HomeScreen';

export const LoginScreen = ({ navigation }) => {
	return (
		<View>
			<Image
				source={require('./../../assets/images/rocket.jpg')}
				style={{
					width: '100%',
					height: 450,
					objectFit: 'cover',
				}}
			/>
			<View style={{ padding: 20 }}>
				<Text style={{ fontSize: 38, fontWeight: 'bold' }}>
					Welcome To
					<Text style={{ color: Colors.PRIMARY }}> MyApp</Text>
				</Text>
				<Text style={{ fontSize: 22, marginTop: 7, color: Colors.GRAY }}>
					{' '}
					It helps you learn in a fun way
				</Text>
				{/* Button section */}
				<Text
					style={{
						marginTop: 50,
						marginStart: 76,
						fontSize: 26,
						fontFamily: 'Outfit-Bold',
					}}
				>
					{' '}
					Choose a language
				</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
						<Image
							source={require('./../../assets/images/Flag_of_Germany.svg.png')}
							style={{ width: 20, height: 20, marginRight: 10, borderRadius: 10 }}
						/>
						<Text style={{ textAlign: 'center', color: Colors.WHITE, fontSize: 18 }}> German</Text>
					</TouchableOpacity>
				</View>
				{/* Button section */}
				<Text
					style={{ marginTop: 15, color: Colors.PRIMARY, textAlign: 'center', marginRight: -10 }}
				>
					made by Tsareva Maria
				</Text>
			</View>
		</View>
	);
};
export default LoginScreen;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
	},
	button: {
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: Colors.PRIMARY,
		borderRadius: 99,
		alignSelf: 'center',
		marginLeft: 125,
		marginBottom: 20,
	},
});
