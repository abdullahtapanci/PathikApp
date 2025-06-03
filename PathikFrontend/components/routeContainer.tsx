import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';

import Stars from '@/components/stars';

const screenHeight = Dimensions.get('window').height;

type Props = {
	id: number;
	name: string;
  	imagePath: string;
  	stars: number;
	country: string;
	city: string;
	onPress?: () => void;
};

export default function routeContainer({ id, name, imagePath, stars, country, city, onPress }: Props) {
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
    		margin: 20,
		height: screenHeight*0.4,
	},
  	image: {
		flex: 3,
    		width: '100%',
    		borderRadius: 12,
		resizeMode: 'cover',
  	},
  	infoContainer: {
		flex: 1,
		marginBottom: 10,
		marginTop: 10,
    		padding: 12,
  	},
  	name: {
    		fontSize: 20,
    		fontWeight: 'bold',
    		marginBottom: 4,
  	},
  	details: {
    	fontSize: 15,
    	color: '#555',
		paddingBottom: 3,
		paddingTop: 3,
  	},
});
