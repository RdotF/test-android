import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from './Utils/Colors';
import LessonSection from '../Components/LessonSection';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalAPI from './Utils/GlobalAPI';
import { ReloadMethodsContext } from '../../App';

export default function WatchLessons() {
	const { params } = useRoute();
	const [userEnrollment, setUserEnrollment] = useState(params?.userEnrollment);
	const [item, setItem] = useState(params?.item);
	const [selectedChapter, setSelectedChapter] = useState();
	const { reload, setReload } = useContext(ReloadMethodsContext);
	const navigation = useNavigation();
	useEffect(() => {
		params && setSelectedChapter(params?.item?.chapter[0]);
		params && setUserEnrollment(params?.userEnrollment);
	}, [params && userEnrollment]);

	const onChapterCompleted = () => {
		GlobalAPI.markChapterCompleted(userEnrollment[0]?.id, selectedChapter.id).then((resp) => {
			setReload('Update Enrollment ');
			ToastAndroid.show('Chapter Completed!', ToastAndroid.SHORT);
		});
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
						uri: selectedChapter.video?.url,
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
						{selectedChapter.name}
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
				userEnrollment={userEnrollment}
				onChapterSelect={(chapter) => setSelectedChapter(chapter)}
				selectedChapter={selectedChapter}
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
