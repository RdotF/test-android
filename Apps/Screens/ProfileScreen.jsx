import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalAPI from './Utils/GlobalAPI';
import CourseItem from '../Components/CourseItem';
import ProgressCourseItem from '../Components/ProgressCourseItem';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function ProfileScreen() {
	const [enrolledCoursesList, setEnrolledCoursesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [completeChapter, setCompleteChapter] = useState([]);
	const db = useSQLiteContext();
	// const getAllUserEnrollCourses = () => {
	// 	setIsLoading(true);
	// 	GlobalAPI.getAllUserEnrollCourses().then((resp) => {
	// 		setEnrolledCoursesList(resp.userEnrollCourses);
	// 		setIsLoading(false);
	// 	});
	// };
	const getUserEnrollCourses = async () => {
		try {
			setIsLoading(true);
			const result = db && (await db.getAllAsync(`select * from UserEnrollCourse;`));
			setEnrolledCoursesList(result);
			setIsLoading(false);
		} catch (er) {
			console.error(er);
		}
	};
	const getCompleteChapters = async () => {
		try {
			const result = db && (await db.getAllAsync(`SELECT * FROM CompleteChapters;`));
			setCompleteChapter(result);
		} catch (er) {
			console.log(er);
		}
	};
	useEffect(() => {
		db && getUserEnrollCourses();
		db && getCompleteChapters();
		// getAllUserEnrollCourses();
	}, [db]);
	useEffect(() => {
		// console.log('enrolledCoursesList', enrolledCoursesList);
		// console.log('CompleteCha', completeChapter);
	}, [enrolledCoursesList, completeChapter]);
	return (
		<View style={{ padding: 20, marginTop: 25 }}>
			<Text
				style={{
					fontFamily: 'Outfit-Bold',
					fontSize: 28,
					textAlign: 'center',
				}}
			>
				My Progress
			</Text>
			{/* List of Course Enrollment */}
			<FlatList
				data={enrolledCoursesList}
				refreshing={isLoading}
				showsVerticalScrollIndicator={false}
				onRefresh={() => getUserEnrollCourses()}
				renderItem={({ item, index }) => (
					<ProgressCourseItem
						completedChapter={completeChapter}
						userEnrollCourse={enrolledCoursesList}
					/>
				)}
			/>
		</View>
	);
}
