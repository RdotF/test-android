import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import SectionHeading from './SectionHeading';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Screens/Utils/Colors';
import { useState } from 'react';

export default function LessonSection({
	item,
	userEnrollCourse,
	onChapterSelect,
	selectedChapter = {},
	chapter,
	completeChapter,
}) {
	useEffect(() => {
		//userEnrollCourse && console.log('userEnrollCourse--', userEnrollCourse);
		//userEnrollCourse && console.log('userEnrollCourse-', userEnrollCourse.length !== 0);
	}, [userEnrollCourse]);
	const checkIsChapterCompleted = (chapterId) => {
		// const result =
		// 	completeChapter && completeChapter.include((item) => item.chapterId == chapterId);
		// console.log('--', completeChapter);
		// return result;
	};
	return (
		<View style={{ marginBottom: 30 }}>
			<SectionHeading heading="Chapters" />
			<FlatList
				data={chapter}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => {
							onChapterSelect(item);
						}}
						style={[
							styles.container,
							selectedChapter == item && { backgroundColor: Colors.PRIMARY_LIGHT },
							checkIsChapterCompleted(item.chapter_id) && {
								backgroundColor: Colors.GREEN_LIGHT,
							},
						]}
					>
						<View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
							<Text
								style={[
									{
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
									checkIsChapterCompleted(item.chapter_id) && {
										color: Colors.GREEN,
										backgroundColor: Colors.GREEN_LIGHT,
									},
								]}
							>
								{++index}
							</Text>
							<Text numberOfLines={1} style={{ fontFamily: 'Outfit-SemiBold', fontSize: 14 }}>
								{item.chapter_name}
							</Text>
						</View>
						{checkIsChapterCompleted(item.chapter_id) ? (
							<Ionicons name="checkmark-circle" size={28} color={Colors.GREEN} />
						) : (userEnrollCourse && userEnrollCourse.length !== 0) || index == 1 ? (
							<Ionicons name="play-circle" size={35} color={Colors.PRIMARY} />
						) : (
							<Ionicons name="lock-closed" size={28} color={Colors.GRAY} />
						)}
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
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
});
