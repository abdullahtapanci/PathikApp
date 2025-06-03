import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';

import Stars from '@/components/stars';

const { width, height } = Dimensions.get('window');

type Props = {
	id: string;
	name: string;
  	imagePath: string;
  	stars: number;
	country: string;
	city: string;
	onPress?: () => void;
};

export default function PlaceContainer({ id, name, imagePath, stars, country, city, onPress }: Props) {
	return (
		<Pressable onPress={onPress}>
    		<View style={styles.container}>
      			<Image source={{ uri: imagePath }} style={styles.image} />

      			<View style={styles.infoContainer}>
        			<Text style={styles.name}>{name}</Text>
				    <Text style={styles.details}>{stars} <Stars rating={stars} starSize={20} /></Text>
				    <Text style={styles.details}>{country}, {city}</Text>
      			</View>
    		</View>
		</Pressable>
  	);
}

const styles = StyleSheet.create({
	container: {
    		borderRadius: 12,
    		backgroundColor: '#FFFFFF',
    		overflow: 'hidden',
    		margin: 0,
            flexDirection: 'row',
			width:width,
			padding:25,
	},
  	image: {
		width: width*0.3,
		height: height*0.2,
    	borderRadius: 12,
		resizeMode: 'cover',
  	},
  	infoContainer: {
		flex: 1,
		marginBottom: 10,
    	paddingLeft: 10,
  	},
  	name: {
    		fontSize: 20,
    		fontWeight: 'bold',
    		marginBottom: 4,
			color:"black",
  	},
  	details: {
    		fontSize: 15,
    		color: '#555',
			paddingBottom: 3,
			paddingTop: 3,
  	},
	details2: {
		fontSize: 12,
		color: '#555',
		paddingBottom: 3,
		paddingTop: 3,
  },
});
