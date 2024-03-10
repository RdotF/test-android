import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../Screens/Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useState } from 'react';

export default function ProgressCourseItem({ completedChapter, userEnrollCourse }) {
	// const navigation = useNavigation();
	const [courseList, setCourseList] = useState([]);
	const db = useSQLiteContext();
	const uniqueChaptersCompleted = [
		...new Set(completedChapter.map((chapter) => chapter.completeChapterId)),
	].length;
	useEffect(() => {
		db && completedChapter && calculatePercCompleted();
		db && getAllChapter();
	}, [db, completedChapter]);
	useEffect(() => {
		userEnrollCourse && console.log('--', completedChapter);
		db && console.log('courseList', courseList);
	}, [userEnrollCourse, courseList]);

	const getAllChapter = async () => {
		try {
			const result =
				db &&
				(await db.getAllAsync(`SELECT CourseList.*
      FROM UserEnrollCourse
      JOIN CourseList ON UserEnrollCourse.CourseList = CourseList.id
      WHERE UserEnrollCourse.CourseId = "${userEnrollCourse[0].CourseId}";`));
			setCourseList(result);
		} catch (er) {
			console.error(er);
		}
	};
	// Completed Chapter
	const calculatePercCompleted = () => {
		// Count unique chapters completed

		// Calculate total chapters in the course
		const totalChapters = courseList?.[0]?.totalChapter ?? 0;
		// Calculate completion percentage
		const completedPercentage = totalChapters === 0 ? 0 : uniqueChaptersCompleted / totalChapters;
		console.log('perc', completedPercentage.toFixed(2));
		return completedPercentage.toFixed(2);
	};

	return (
		<TouchableOpacity
			style={{
				backgroundColor: Colors.WHITE,
				marginBottom: 10,
				padding: 10,
				borderRadius: 15,
				marginTop: 5,
			}}
		>
			<Image source={{ uri: courseList[0]?.banner }} style={{ borderRadius: 15, height: 180 }} />
			<View>
				<Text
					style={{
						fontSize: 20,
						fontFamily: 'Outfit-Medium',
						marginTop: 5,
						marginLeft: 3,
						textAlign: 'left',
					}}
				>
					{courseList[0]?.name}
				</Text>

				{courseList[0]?.totalChapter ? (
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'left',
							justifyContent: 'space-between',
							marginLeft: 3,
						}}
					>
						<Ionicons name="bookmarks-sharp" size={20} color="black" />
						<Text
							style={{
								fontFamily: 'Outfit-SemiBold',
								textAlign: 'center',
								marginStart: -268,
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
							{uniqueChaptersCompleted}/{courseList[0]?.totalChapter}
						</Text>
					</View>
				) : null}
				<ProgressBar perc={calculatePercCompleted()} />
			</View>
		</TouchableOpacity>
	);
}
