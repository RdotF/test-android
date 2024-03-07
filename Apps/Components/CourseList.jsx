import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import CourseItem from './CourseItem';
import { useEffect } from 'react';
export default function CourseList({ courseList }) {
	useEffect(() => {
		//console.log('courseList', courseList);
	}, []);
	return (
		<View>
			<FlatList
				data={courseList}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => <CourseItem item={item} />}
			/>
		</View>
	);
}
