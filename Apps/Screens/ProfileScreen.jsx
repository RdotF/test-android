import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalAPI from './Utils/GlobalAPI';
import CourseItem from '../Components/CourseItem';
import ProgressCourseItem from '../Components/ProgressCourseItem';

export default function ProfileScreen() {
	const [enrolledCoursesList, setEnrolledCoursesList] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const getAllUserEnrollCourses = () => {
		setIsLoading(true);
		GlobalAPI.getAllUserEnrollCourses().then((resp) => {
			setEnrolledCoursesList(resp.userEnrollCourses);
			setIsLoading(false);
		});
	};
	useEffect(() => {
		getAllUserEnrollCourses();
		//console.log(enrolledCoursesList.length);
	}, []);
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
				onRefresh={() => getAllUserEnrollCourses()}
				renderItem={({ item, index }) => (
					<ProgressCourseItem
						completedChapter={item?.completedChapter?.length}
						item={item.courseList}
					/>
				)}
			/>
		</View>
	);
}
