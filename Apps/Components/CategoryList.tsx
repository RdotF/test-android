import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Screens/Utils/Colors';
import SectionHeading from './SectionHeading';
import { Ionicons } from '@expo/vector-icons';
import { ITags } from '../Screens/Interfaces/types';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function CategoryList({ buttons, setSelectedCategory, isLoading }) {
	const [activeIndex, setActiveIndex] = useState<number>(-1);
	const [tags, setTags] = useState<ITags[]>([]);
  
	const db = useSQLiteContext();
	const getTags = async () => {
		try {
      
      const result = db&&( await db.getAllAsync<ITags>(`SELECT * FROM Tags;`));
			setTags(result);
		} catch (er) {
			console.log(er);
		}
    
	};
	useEffect(() => {
		db &&
			db.withTransactionAsync(async () => {
				await getTags();
			});
    
	}, [db]);
	return (
		<View style={{ marginTop: 15 }}>
			<SectionHeading heading={'Category'} />
			<View style={{ alignItems: 'center' }}>
				<FlatList
       
					data={buttons}
					horizontal={true}
					scrollEnabled={false}
          refreshing={isLoading}
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
                const matchingTag = tags.find(tag => tag.id === item.tag);
                setSelectedCategory(matchingTag);
                }
              }
						>
							<Image
								source={{ uri: item.icon }}
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
