import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import GlobalAPI from './Utils/GlobalAPI.js';
import CategoryList from '../Components/CategoryList.jsx';
import SectionHeading from '../Components/SectionHeading.jsx';
import CourseList from '../Components/CourseList.jsx';

export default function FirstScreen() {
	const [buttons, setButtons] = useState();
	const [orgCourseList, setOrgCourseList] = useState([]);
	useEffect(() => {
		getCategory();
		getCourseList();
		console.log('', buttons);
	}, []);
	const [courseList, setCourseList] = useState([]);
	//Get Category List from hygraph
	const getCategory = () => {
		GlobalAPI.getCategory()
			.then((resp) => {
				setButtons(resp.buttons);
			})
			.catch((er) => {
				console.error(er);
			});
	};
	const getCourseList = () => {
		GlobalAPI.getCourseList()
			.then((resp) => {
				setCourseList(resp?.courseLists);
				setOrgCourseList(resp?.courseLists);
			})
			.catch((er) => {
				console.error(er);
			});
	};

	const getFilterCourseList = (tag) => {
		const result = courseList.filter((item) => item.tag.includes(tag));
		return result;
	};
	const filterCourseList = (category) => {
		const result = orgCourseList.filter((item) => item.tag.includes(category));
		setCourseList(result);
	};
	return (
		<ScrollView style={{ padding: 20, marginTop: 25 }}>
			<Header />
			{/* Category */}
			<CategoryList
				buttons={buttons}
				setSelectedCategory={(category) => filterCourseList(category)}
			/>
			{/* Courses */}
			<SectionHeading heading={'Courses'} />
			<CourseList courseList={getFilterCourseList('courses')} />
			{/* Media */}
			<SectionHeading heading={'Media'} />
			<CourseList courseList={getFilterCourseList('media')} />
			{/* Popular Course List */}
			<View style={{ marginBottom: 50 }}>
				<SectionHeading heading={'For Beginners'} />
				<CourseList courseList={getFilterCourseList('a1')} />
			</View>
		</ScrollView>
	);
}
