import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../Screens/Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';

export default function ProgressCourseItem({ completedChapter, item }) {
	const navigation = useNavigation();
	useEffect(() => {}, []);
	// total chapter
	// Completed Chapter
	const calculatePercCompleted = () => {
		// (completedChapter/totalChapterCompleted)*100
		const result = item?.chapter?.length == 0 ? 0 : completedChapter / item?.chapter?.length;
		return result.toFixed(2);
	};
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('course-detail', { item: item })}
			style={{
				backgroundColor: Colors.WHITE,
				marginBottom: 10,
				padding: 10,
				borderRadius: 15,
				marginTop: 5,
			}}
		>
			<Image source={{ uri: item?.banner?.url }} style={{ borderRadius: 15, height: 180 }} />
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
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginRight: 3,
						}}
					>
						{/* <Ionicons name="bookmarks-sharp" size={20} color="black" /> */}
						<Text
							style={{
								fontFamily: 'Outfit-SemiBold',
								textAlign: 'center',
								marginLeft: 3,
							}}
						>
							{calculatePercCompleted() * 100}%
						</Text>
						<Text
							style={{
								fontFamily: 'Outfit-SemiBold',
								textAlign: 'center',
								color: Colors.GREEN,
							}}
						>
							{completedChapter}/{item.chapter?.length}
						</Text>
					</View>
				) : null}
				<ProgressBar perc={calculatePercCompleted()} />
			</View>
		</TouchableOpacity>
	);
}
