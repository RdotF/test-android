import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from './Utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CourseIntro from '../Components/CourseIntro';
import StartCourse from '../Components/StartCourse';
import LessonSection from '../Components/LessonSection';
import { ScrollView } from 'react-native';
import { ReloadMethodsContext } from '../../App';
import { useContext } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function CourseDetailScreen() {
	const { params } = useRoute();
	const [item, setItem] = useState({});
	const [chapter, setChapter] = useState();
	const navigation = useNavigation();
	const { reload, setReload } = useContext(ReloadMethodsContext);
	const [userEnrollCourse, setUserEnrollCourse] = useState();
	const [completeChapter, setCompleteChapter] = useState([]);
	const db = useSQLiteContext();

	const InsertOnStart = async () => {
		try {
			const result =
				db &&
				(await db.getAllAsync(
					`INSERT INTO UserEnrollCourse (CourseId, CourseList)
			VALUES (?, ?); SELECT * FROM UserEnrollCourse`,
					[item.slug, item.id],
				));
			setUserEnrollCourse(result);
		} catch (er) {
			console.log(er);
		}
	};
	const getCompleteChapters = async () => {
		try {
			const result = db && (await db.getAllAsync(`select * from CompleteChapters;`));
			setCompleteChapter(result);
		} catch (er) {
			console.log(er);
		}
	};
	const getUserEnrollCourse = async () => {
		try {
			const result =
				db &&
				(await db.getAllAsync(
					`SELECT UserEnrollCourse.*
      FROM UserEnrollCourse
      JOIN CourseList ON UserEnrollCourse.CourseList = CourseList.id
      WHERE CourseList.id = ?;`,
					[params.item.id],
				));

			setUserEnrollCourse(result);
		} catch (er) {
			console.log(er);
		}
	};
	useEffect(() => {
		setItem(params.item);
		setChapter(params.chapter);
		getCompleteChapters();
		params && checkIsUserStartedTheCourse(params.item);
	}, [params && db]);
	useEffect(() => {
		//db useEffect!!

		db && getUserEnrollCourse();
		reload && checkIsUserStartedTheCourse();
	}, [db && reload]);
	const checkIsUserStartedTheCourse = async (item) => {
		try {
			const result =
				db &&
				item &&
				(await db.getAllAsync(
					`SELECT uec.id AS id,
          uec.CourseId AS courseId,
          uec.CourseList AS courseList,
          cc.completeChapterId AS completedChapterId
      FROM UserEnrollCourse uec
      JOIN UEC_CC ON uec.id = UEC_CC.uec_id_FK
      JOIN CompleteChapters cc ON UEC_CC.cc_id_FK = cc.id
      WHERE uec.CourseList = ?;`,
					[params.item.id],
				));
			setUserEnrollCourse(result);
		} catch (er) {
			console.log(er);
		}
	};

	const onStartPress = () => {
		db && userEnrollCourse && InsertOnStart();
		if (userEnrollCourse?.length > 0) {
			Alert.alert('Great!', 'You have just enrolled to new course!', [
				{ text: 'Ok', onPress: () => console.log('Ok Press'), style: 'cancel' },
			]);
			checkIsUserStartedTheCourse(item);
		}
	};

	return (
		<ScrollView style={{ padding: 20, marginTop: 25 }}>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 55 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Ionicons name="arrow-back-circle-sharp" size={50} color={Colors.PRIMARY} />
				</TouchableOpacity>
				<Text style={{ fontSize: 28, fontFamily: 'Outfit-Bold' }}>Course Detail</Text>
			</View>
			{/* CourseIntro */}
			<CourseIntro item={item} chapter={chapter} />
			{/* StartButton */}
			<StartCourse
				userEnrollCourse={userEnrollCourse}
				item={item}
				chapter={chapter}
				onStartPress={() => onStartPress()}
				onContinuePress={() =>
					navigation.navigate('watch-lesson', {
						item: item,
						userEnrollCourse: userEnrollCourse,
						chapter: chapter,
					})
				}
			/>
			{/* List of Chapters */}
			<LessonSection
				item={item}
				userEnrollCourse={userEnrollCourse}
				chapter={chapter}
				completeChapter={completeChapter}
			/>
		</ScrollView>
	);
}
