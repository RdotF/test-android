import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CategoryList from '../Components/CategoryList';
import SectionHeading from '../Components/SectionHeading.jsx';
import CourseList from '../Components/CourseList.jsx';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function FirstScreen() {
	const [categories, setCategories] = useState([]);
	const [courseLists, setCourseLists] = useState([]);
	const [tags, setTags] = useState([]);
	const [orgCourseList, setOrgCourseList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const db = useSQLiteContext();
	const getCategories = async () => {
		try {
			const result = db && (await db.getAllAsync(`SELECT * FROM Button;`));
			setCategories(result);
		} catch (er) {
			console.log(er);
		}
	};
	const getCourseList = async () => {
		try {
			setIsLoading(true);
			const result = db && (await db.getAllAsync(`SELECT * FROM CourseList;`));
			setCourseLists(result);
			setOrgCourseList(result);
			setIsLoading(false);
		} catch (er) {
			console.log(er);
		}
	};
	const getTags = async () => {
		try {
			const result =
				db &&
				(await db.getAllAsync(
					`SELECT CourseList.name AS course_name,
      GROUP_CONCAT(Tags.type) AS tags
      FROM CourseList
      LEFT JOIN CL_Tags ON CourseList.id = CL_Tags.CL_id_FK
      LEFT JOIN Tags ON CL_Tags.Tags_id_FK = Tags.id
      GROUP BY CourseList.id;`,
				));

			setTags(result);
		} catch (er) {
			console.log(er);
		}
	};
	useEffect(() => {
		db && getCategories();
		getCourseList();
		getTags();
		getFilterCourseList(tags);
	}, [db]);

	const getFilterCourseList = (name_of_tag) => {
		const filteredTags = tags.filter((item) => item.tags.includes(name_of_tag));

		// Extract the course names associated with the filtered tags
		const courseNames = filteredTags.map((tag) => tag.course_name);

		// Filter the courseLists array based on the extracted course names
		const filterCourseList = courseLists.filter((item) => courseNames.includes(item.name));

		return filterCourseList;
	};
	const filterCourseList = (category) => {
		const filteredTags = tags.filter((item) => item.tags.includes(category.type));

		// Extract the course names associated with the filtered tags
		const courseNames = filteredTags.map((tag) => tag.course_name);

		// Filter the courseLists array based on the extracted course names
		const filterCourseList = orgCourseList.filter((item) => courseNames.includes(item.name));
		setCourseLists(filterCourseList);
	};
	return (
		<ScrollView style={{ padding: 20, marginTop: 25 }}>
			<Header />
			{/* Category */}
			<CategoryList
				buttons={categories}
				setSelectedCategory={(category) => filterCourseList(category)}
				isLoading={isLoading}
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
