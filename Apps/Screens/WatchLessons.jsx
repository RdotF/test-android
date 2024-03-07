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
	const [selectedChapter, setSelectedChapter] = useState();
	const { reload, setReload } = useContext(ReloadMethodsContext);
	const [lastId, setLastId] = useState();
	const [completeChapter, setCompleteChapter] = useState();
	const navigation = useNavigation();

	const db = useSQLiteContext();
	useEffect(() => {
		params && setSelectedChapter(params?.chapter[0]);
		params && setuserEnrollCourse(params?.userEnrollCourse);
		db && getCompletedChapter();
	}, [params && userEnrollCourse && db]);
	const insertCompleteChapter = async () => {
		try {
			const result =
				db &&
				params &&
				(await db.getAllAsync(
					`INSERT INTO CompleteChapters (completeChapterId)
      VALUES (?); SELECT last_insert_rowid() AS last_id;`,
					[selectedChapter.chapter_id],
				));
			setLastId(result);
			console.log(result);
		} catch (er) {
			console.log(er);
		}
	};
	const getCompletedChapter = async () => {
		try {
			const result =
				db &&
				params &&
				(await db.getAllAsync(
					`INSERT INTO UEC_CC (uec_id_FK, cc_id_FK)
          VALUES (1, 2); 
          SELECT cc.completeChapterId
          FROM CompleteChapters cc
          JOIN UEC_CC ON cc.id = UEC_CC.cc_id_FK
          JOIN UserEnrollCourse uec ON UEC_CC.uec_id_FK = uec.id
          WHERE uec.id = ?;`,
					[lastId],
				));
			setCompleteChapter(result);
			console.log(completeChapter);
		} catch (er) {
			console.log(er);
		}
	};
	const onChapterCompleted = () => {
		db && insertCompleteChapter();
		setReload('Update Enrollment ');
		ToastAndroid.show('Chapter Completed!', ToastAndroid.SHORT);
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
