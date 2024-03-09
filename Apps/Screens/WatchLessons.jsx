import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from './Utils/Colors';
import LessonSection from '../Components/LessonSection';
import { ScrollView } from 'react-native-gesture-handler';
import { ReloadMethodsContext } from '../../App';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function WatchLessons() {
	const { params } = useRoute();
	const [userEnrollCourse, setuserEnrollCourse] = useState(params?.userEnrollCourse);
	const [item, setItem] = useState(params?.item);
	const [selectedChapter, setSelectedChapter] = useState([]);
	const { reload, setReload } = useContext(ReloadMethodsContext);

	const [completeChapter, setCompleteChapter] = useState([]);
	const navigation = useNavigation();
	//const [completeChapterUserEnroll, setCompleteChapterUserEnroll] = useState();
	const db = useSQLiteContext();
	useEffect(() => {
		//deleteTable();
		params && setSelectedChapter(params?.chapter[0]);
		params && setuserEnrollCourse(params?.userEnrollCourse);
	}, [params && userEnrollCourse && completeChapter]);
	const deleteTable = async () => {
		try {
			const resultDELETE = await db.execAsync(`CREATE TABLE IF NOT EXISTS "CompleteChapters" (
        "id"	INTEGER NOT NULL,
        "completeChapterId"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
      );`);
			const resultSELECT = await db.getAllAsync(`SELECT * FROM CompleteChapters`);
			console.log('delete', resultSELECT);
			setCompleteChapterUserEnroll(resultSELECT);
		} catch (er) {
			console.error(er);
		}
	};
	const onChapterCompleted = async () => {
		try {
			// Ensure that a chapter is selected
			if (!selectedChapter) return;

			// Insert the completed chapter into the CompleteChapters table
			await db.execAsync(
				`INSERT INTO CompleteChapters (completeChapterId) VALUES (${selectedChapter.chapter_id});`,
			);

			// Get the last inserted ID
			const lastIdResult = await db.getAllAsync(`SELECT last_insert_rowid() AS last_id;`);
			const lastId = lastIdResult[0]?.last_id;

			// Insert the relationship between the user enrollment course and the completed chapter
			if (lastId) {
				await db.execAsync(
					`INSERT INTO UEC_CC (uec_id_FK, cc_id_FK) VALUES (${params.userEnrollCourse[0].id}, ${lastId});`,
				);

				// Retrieve the list of completed chapters for the user enrollment course
				const result = await db.getAllAsync(
					`SELECT cc.id, cc.completeChapterId, uec_cc.uec_id_FK as enrollCourseId 
              FROM CompleteChapters cc
              JOIN UEC_CC uec_cc ON cc.id = uec_cc.cc_id_FK
              WHERE uec_cc.uec_id_FK = ${params.userEnrollCourse[0].id};`,
				);
				setCompleteChapter(result);

				setCompleteChapterUserEnroll(
					result.map((row) => ({
						id: row.id,
						completeChapterId: row.completeChapterId,
						enrollCourseId: row.enrollCourseId,
					})),
				);
				ToastAndroid.show('Chapter Completed!', ToastAndroid.SHORT);
			}
		} catch (error) {
			console.error('Error completing chapter:', error);
		}
	};
	return (
		<ScrollView style={{ padding: 15 }}>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 84 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Ionicons name="arrow-back-circle-sharp" size={50} color={Colors.PRIMARY} />
				</TouchableOpacity>
				<Text style={{ fontSize: 28, fontFamily: 'Outfit-Bold' }}>Lessons</Text>
			</View>
			{selectedChapter && (
				<Video
					style={styles.video}
					source={{
						uri: selectedChapter.chapter_video_url,
					}}
					useNativeControls={true}
					resizeMode={ResizeMode.CONTAIN}
					isLooping
				/>
			)}
			{selectedChapter && (
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginTop: 10,
					}}
				>
					<Text style={{ fontFamily: 'Outfit-Bold', fontSize: 20, flex: 1 }}>
						{selectedChapter.chapter_name}
					</Text>
					<TouchableOpacity
						onPress={() => onChapterCompleted()}
						style={{
							backgroundColor: Colors.PRIMARY,
							padding: 4,
							borderRadius: 4,
							paddingHorizontal: 8,
						}}
					>
						<Text
							style={{ color: Colors.WHITE, textAlign: 'center', fontFamily: 'Outfit-Regular' }}
						>
							Completed
						</Text>
					</TouchableOpacity>
				</View>
			)}

			<LessonSection
				item={item}
				userEnrollCourse={userEnrollCourse}
				chapter={params?.chapter}
				onChapterSelect={(chapter) => setSelectedChapter(chapter)}
				selectedChapter={selectedChapter}
				completeChapter={completeChapter}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	video: {
		width: '100%',
		height: 250,
	},
});
