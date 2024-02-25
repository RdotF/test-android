import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Screens/Utils/Colors';
import SectionHeading from './SectionHeading';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryList({ buttons, setSelectedCategory }) {
	const [activeIndex, setActiveIndex] = useState();

	return (
		<View style={{ marginTop: 15 }}>
			<SectionHeading heading={'Category'} />
			<View style={{ alignItems: 'center' }}>
				<FlatList
					data={buttons}
					horizontal={true}
					scrollEnabled={false}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={[
								styles.container,
								activeIndex == index && {
									borderWidth: 1,
									borderColor: Colors.PRIMARY,
								},
							]} // above is the state styling
							onPress={() => {
								setActiveIndex(index);
								setSelectedCategory(item.tag);
							}}
						>
							<Image
								source={{ uri: item.icon.url }}
								style={{ width: 50, height: 45, borderRadius: 99, objectFit: 'cover' }}
							/>
							<Text>{item?.name}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.WHITE,
		padding: 5,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		gap: 5,
		width: 80,
	},
});
