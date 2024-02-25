import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import Colors from '../Screens/Utils/Colors';

export default function ProgressBar({ perc }) {
	const screenWidth = Dimensions.get('screen').width * 0.86;
	const progressWidth = screenWidth * perc;
	return (
		<View style={{ marginTop: 8, backgroundColor: Colors.GRAY, borderRadius: 99 }}>
			<View
				style={{
					height: 7,
					backgroundColor: Colors.GREEN,
					borderRadius: 99,
					width: progressWidth,
				}}
			></View>
		</View>
	);
}
