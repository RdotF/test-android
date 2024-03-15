import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProgressCourseItem from '../Components/ProgressCourseItem';
import { useSQLiteContext } from 'expo-sqlite/next';
import { RefreshControl } from 'react-native';

export default function ProfileScreen() {
	const [enrolledCoursesList, setEnrolledCoursesList] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [completeChapter, setCompleteChapter] = useState();
	const db = useSQLiteContext();

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const enrolledCourses = db && (await db.getAllAsync(`SELECT * FROM UserEnrollCourse;`));
			const chapters = db && (await db.getAllAsync(`SELECT * FROM CompleteChapters;`));
			db && setEnrolledCoursesList(enrolledCourses);
			db && setCompleteChapter(chapters);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log('enrolledCoursesList--', enrolledCoursesList);
		fetchData();
	}, [db]);

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
			{/* Render the FlatList only when data has been fetched */}
			{!isLoading && enrolledCoursesList && completeChapter && db && (
				<FlatList
					data={enrolledCoursesList}
					refreshing={isLoading}
					showsVerticalScrollIndicator={false}
					onRefresh={fetchData}
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchData} />}
					renderItem={({ item, index }) => (
						<ProgressCourseItem completedChapter={completeChapter} userEnrollCourse={item} />
					)}
				/>
			)}
		</View>
	);
}
