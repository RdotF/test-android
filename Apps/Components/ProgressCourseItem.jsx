import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Screens/Utils/Colors';
import ProgressBar from './ProgressBar';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function ProgressCourseItem({ completedChapter, userEnrollCourse }) {
	const [courseList, setCourseList] = useState([]);
	const [poolOfChapters, setPoolOfChapters] = useState([]);
	const [uniqueChaptersCompleted, setUniqueChaptersCompleted] = useState(0);
	const db = useSQLiteContext();

	useEffect(() => {
		if (completedChapter && userEnrollCourse && db) {
			fetchData();
		}
	}, [completedChapter, userEnrollCourse, db]);

	useEffect(() => {
		calculateUniqueChaptersCompleted();
	}, [completedChapter, poolOfChapters]);

	const fetchData = async () => {
		try {
			const courseListResult =
				db &&
				(await db.getAllAsync(`
          SELECT *
          FROM CourseList
          WHERE slug = "${userEnrollCourse.CourseId}";
        `));
			setCourseList(courseListResult);

			const poolOfChaptersResult =
				db &&
				(await db.getAllAsync(`
          SELECT Chapter.*
          FROM Chapter
          JOIN CL_Chapter ON Chapter.id = CL_Chapter.chapter_id_FK
          JOIN CourseList ON CL_Chapter.CL_id_FK = CourseList.id
          WHERE CourseList.slug = "${userEnrollCourse.CourseId}";
        `));
			setPoolOfChapters(poolOfChaptersResult.map((chapter) => chapter.id));
		} catch (error) {
			console.error(error);
		}
	};

	const calculateUniqueChaptersCompleted = () => {
		if (completedChapter && poolOfChapters) {
			const completedChaptersForCourse = completedChapter.filter((chapter) =>
				poolOfChapters.includes(chapter.completeChapterId),
			);
			const uniqueChapters = new Set(
				completedChaptersForCourse.map((chapter) => chapter.completeChapterId),
			);
			setUniqueChaptersCompleted(uniqueChapters.size);
		}
	};

	const calculatePercCompleted = () => {
		const totalChapters = poolOfChapters?.length ?? 0;
		const completedPercentage = totalChapters === 0 ? 0 : uniqueChaptersCompleted / totalChapters;

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
			{courseList?.length > 0 && (
				<Image source={{ uri: courseList[0]?.banner }} style={{ borderRadius: 15, height: 180 }} />
			)}
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
				{courseList?.length ? (
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
							{uniqueChaptersCompleted}/{poolOfChapters?.length}
						</Text>
					</View>
				) : null}
				<ProgressBar perc={calculatePercCompleted()} />
			</View>
		</TouchableOpacity>
	);
}
