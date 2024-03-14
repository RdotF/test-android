import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import SectionHeading from './SectionHeading';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Screens/Utils/Colors';

export default function LessonSection({
	item,
	userEnrollCourse,
	onChapterSelect,
	selectedChapter = {},
	chapter,
	completeChapter,
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		completeChapter && console.log('completeChapter', completeChapter);
	}, [userEnrollCourse]);

	const checkIsChapterCompleted = (chapterId) => {
		return completeChapter && completeChapter.some((item) => item.completeChapterId === chapterId);
	};

	const handleChapterPress = (item) => {
		onChapterSelect(item);
	};

	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			onPress={() => handleChapterPress(item)}
			style={[
				styles.container,
				selectedChapter === item && { backgroundColor: Colors.PRIMARY_LIGHT },
				checkIsChapterCompleted(item.chapter_id) && { backgroundColor: Colors.GREEN_LIGHT },
			]}
		>
			<View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
				<Text
					style={[
						styles.chapterNumber,
						checkIsChapterCompleted(item.chapter_id) && { color: Colors.GREEN },
					]}
				>
					{++index}
				</Text>
				<Text numberOfLines={1} style={styles.chapterName}>
					{item.chapter_name}
				</Text>
			</View>
			{checkIsChapterCompleted(item.chapter_id) ? (
				<Ionicons name="checkmark-circle" size={28} color={Colors.GREEN} />
			) : (userEnrollCourse && userEnrollCourse.length !== 0) || index === 1 ? (
				<Ionicons name="play-circle" size={35} color={Colors.PRIMARY} />
			) : (
				<Ionicons name="lock-closed" size={28} color={Colors.GRAY} />
			)}
		</TouchableOpacity>
	);

	return (
		<View style={{ marginBottom: 30 }}>
			<SectionHeading heading="Chapters" />
			<FlatList
				data={chapter}
				renderItem={renderItem}
				refreshing={isLoading}
				onRefresh={() => setIsLoading(true)}
				onEndReached={() => setIsLoading(false)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		borderWidth: 0.5,
		backgroundColor: Colors.WHITE,
		marginBottom: 10,
		marginTop: 5,
		borderRadius: 10,
	},
	chapterNumber: {
		fontSize: 16,
		fontFamily: 'Outfit-Regular',
		padding: 10,
		backgroundColor: Colors.PRIMARY_LIGHT,
		borderRadius: 99,
		width: 38,
		height: 38,
		textAlign: 'center',
		color: Colors.PRIMARY,
	},
	chapterName: {
		fontFamily: 'Outfit-SemiBold',
		fontSize: 14,
	},
});
