import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../Screens/Utils/Colors';

export default function StartCourse({ userEnrollment, item, onStartPress, onContinuePress }) {
	useEffect(() => {}, []);
	return (
		<>
			{item?.chapter?.length ? (
				<View
					style={{
						padding: 15,
						backgroundColor: Colors.PRIMARY,
						borderRadius: 10,
						display: 'flex',
						marginTop: 10,
						marginBottom: 20,
					}}
				>
					{userEnrollment?.length > 0 ? (
						<TouchableOpacity onPress={() => onContinuePress()}>
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Outfit-Medium',
									fontSize: 16,
									color: Colors.WHITE,
								}}
							>
								Continue the Course
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => {
								onStartPress();
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Outfit-Medium',
									fontSize: 16,
									color: Colors.WHITE,
								}}
							>
								Start the Course
							</Text>
						</TouchableOpacity>
					)}
				</View>
			) : null}
		</>
	);
}
