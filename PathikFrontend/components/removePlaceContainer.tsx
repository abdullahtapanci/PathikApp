import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';

import Stars from '@/components/stars';
import Button from '@/components/button';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

type Props = {
	id: string;
	name: string;
  	imagePath: string;
  	stars: number;
	country: string;
	city: string;
	onPress?: () => void;
	onRemove?: () => void;
};

export default function placeContainer({ id, name, imagePath, stars, country, city, onPress, onRemove }: Props) {
	return (
		<Pressable onPress={onPress}>
    		<View style={styles.container}>
      			<Image source={{ uri: imagePath }} style={styles.image} />

      			<View style={styles.infoContainer}>
        			<Text style={styles.name}>{name}</Text>
				    <Text style={styles.details}>{stars} <Stars rating={stars} starSize={20} /></Text>
				    <Text style={styles.details}>{country}, {city}</Text>
      			</View>

				<Button label="x" bgColor='#FF0032' onPress={onRemove}></Button>
    		</View>
		</Pressable>
  	);
}

const styles = StyleSheet.create({
	container: {
    		borderRadius: 12,
    		backgroundColor: '#FFFFFF',
    		overflow: 'hidden',
    		margin: 10,
            flexDirection: 'row',
	},
  	image: {
		width: screenWidth*0.3,
		height: screenHeight*0.2,
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
