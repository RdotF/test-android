import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Screens/Utils/Colors';
import SectionHeading from '../Components/SectionHeading';
import LessonSection from './LessonSection';

export default function CourseIntro({ item, chapter }) {
	const firstChapterUrl =
		chapter && chapter?.find((ch) => ch.chapter_number === 1)?.chapter_video_url;
	return (
		chapter &&
		item && (
			<View style={{ backgroundColor: Colors.WHITE, padding: 15, borderRadius: 10 }}>
				{chapter?.length ? (
					<View>
						<Text
							style={{
								marginBottom: -20,
								fontFamily: 'Outfit-Regular',
								fontSize: 14,
								color: Colors.GRAY,
							}}
						>
							Check out the first chapter!
						</Text>
						<Video
							style={styles.video}
							source={{
								uri: firstChapterUrl,
							}}
							useNativeControls={true}
							resizeMode={ResizeMode.CONTAIN}
							isLooping
						/>
					</View>
				) : null}
				<View style={{ display: 'flex', gap: 10 }}>
					<Text style={{ fontSize: 28, fontFamily: 'Outfit-SemiBold' }}>{item.name}</Text>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center' }}>
					<Ionicons name="bookmarks-sharp" size={20} color={Colors.PRIMARY} />
					<Text
						style={{
							fontSize: 18,
							fontFamily: 'Outfit-Regular',
							textAlign: 'center',
						}}
					>
						{chapter?.length} Chapters
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<SectionHeading heading={'Description'} />
					<Text style={{ marginTop: -5, fontFamily: 'Outfit-Regular', fontSize: 16 }}>
						{item?.description}
					</Text>
					<Text style={{ marginTop: 15, fontFamily: 'Outfit-Regular', fontSize: 16 }}>
						This course is under development and could use your feetback after you've completed it!
						Please contact us via official email that could be found on our social media.
					</Text>
				</View>
			</View>
		)
	);
}

const styles = StyleSheet.create({
	video: {
		width: '100%',
		height: 250,
	},
});
