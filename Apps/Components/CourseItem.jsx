import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Screens/Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function CourseItem({ item }) {
	const db = useSQLiteContext();
	const navigation = useNavigation();
	const [chapter, setChapter] = useState([]);
	const getChapters = async () => {
		try {
			const result =
				db &&
				(await db.getAllAsync(
					`SELECT CL_Chapter.id AS chapter_id, 
                  CL_Chapter.chapter_id_FK AS chapter_id_reference, 
                  Chapter.name AS chapter_name, 
                  Chapter.videoUrl AS chapter_video_url, 
                  Chapter.chapterNumber AS chapter_number
                  FROM CL_Chapter
                  JOIN CourseList ON CL_Chapter.CL_id_FK = CourseList.id
                  JOIN Chapter ON CL_Chapter.chapter_id_FK = Chapter.id
                  WHERE CourseList.id = ?;`,
					[item.id],
				));
			setChapter(result);
		} catch (er) {
			console.log(er);
		}
	};
	useEffect(() => {
		const fetchChapters = async () => {
			await getChapters();
			// Log inside useEffect
		};

		db && fetchChapters();
	}, [db]);
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('course-detail', { item: item, chapter: chapter })}
			style={{
				backgroundColor: Colors.WHITE,
				width: 270,
				marginRight: 15,
				padding: 10,
				borderRadius: 15,
			}}
		>
			<Image source={{ uri: item?.banner }} style={{ width: 240, borderRadius: 15, height: 130 }} />
			<View>
				<Text
					style={{
						fontSize: 18,
						fontFamily: 'Outfit-Medium',
						marginTop: 5,
						marginLeft: 3,
						textAlign: 'left',
					}}
				>
					{item?.name}
				</Text>
				{chapter.length ? (
					<View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
						<Ionicons name="bookmarks-sharp" size={20} color="black" />
						<Text
							style={{
								fontFamily: 'Outfit-Regular',
								textAlign: 'center',
							}}
						>
							{chapter?.length} Chapters
						</Text>
					</View>
				) : null}
			</View>
		</TouchableOpacity>
	);
}
