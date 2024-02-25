import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../Screens/Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function CourseItem({ item }) {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('course-detail', { item: item })}
			style={{
				backgroundColor: Colors.WHITE,
				width: 270,
				marginRight: 15,
				padding: 10,
				borderRadius: 15,
			}}
		>
			<Image
				source={{ uri: item?.banner?.url }}
				style={{ width: 240, borderRadius: 15, height: 130 }}
			/>
			<View>
				<Text
					style={{
						fontSize: 18,
						fontFamily: 'Outfit-Medium',
						marginTop: 5,
						marginLeft: 3,
						textAlign: 'left',
					}}
				>
					{item?.name}
				</Text>
				{item?.chapter?.length ? (
					<View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center' }}>
						<Ionicons name="bookmarks-sharp" size={20} color="black" />
						<Text
							style={{
								fontFamily: 'Outfit-Regular',
								textAlign: 'center',
							}}
						>
							{item?.chapter?.length} Chapters
						</Text>
					</View>
				) : null}
			</View>
		</TouchableOpacity>
	);
}
