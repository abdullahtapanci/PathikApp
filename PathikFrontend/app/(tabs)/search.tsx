import { Text, View, StyleSheet, TextInput, Alert, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
import { searchPlace } from "../../services/placeService";

import Button from '@/components/button';
import PlaceContainer from '@/components/placeContainer';

const { width, height } = Dimensions.get('window');

export interface AddressObject {
  city: string;
  country: string;
}

export interface tripadvisorPhotoResponseDTO{
  data: photoDTO[];
}

export interface photoDTO{
  images: ImageSizes;
}

export interface ImageSizes{
  small: ImageInfo;
  medium: ImageInfo;
}

export interface ImageInfo{
    url: string;
}

interface Place {
  location_id: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  rating: string;
  address_obj: AddressObject;
  tripadvisor_photo: tripadvisorPhotoResponseDTO;

}

export default function SearchScreen() {

	const [searchQuery, setSearchQuery] = useState('');
	const [searchQueryResult, setSearchQueryResult] = useState<Place[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		try{
			setIsLoading(true);
			const result = await searchPlace(searchQuery);
			setSearchQueryResult(result);
			console.log(result);
		}catch(error){
			console.error(error);
			Alert.alert('failed fetching place data');
		}finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={{flex:1}}>
		<ScrollView >
			<View style={styles.container}>
				{isLoading && (
					<View style={styles.loadingOverlay}>
					<ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
					<Text style={styles.loadingText}>Searching places...</Text>
					</View>
				)}
				<View style={styles.headingContainer}>
					<Text style={styles.heading}>Where to?</Text>
				</View>
			
				<View style={styles.searchBarContainer}>
					<View style={styles.searchBox}>
					<Feather name={'search'} color={"#35E0A1"} size={24} style={styles.icon} />
					<TextInput
						style={styles.input}
						placeholder="Places to go, things to do ..."
						value={searchQuery}
						onChangeText={(text) => setSearchQuery(text)}
					/>
					</View>
			
					<Button label="Search" bgColor='#000000' textColor='#FFFFFF' onPress={handleSearch} />

					<Text style={{fontSize: 15}}>or</Text>

					<Button label="Try our powerfull path creator" bgColor='#000000' textColor='#FFFFFF' onPress={()=>router.push("/(tabs)/(details)/create/createRoute")} />

					<View style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
						{searchQueryResult?.map((place) => (
							<PlaceContainer
								key={place.location_id}
								id={place.location_id}
								name={place.name}
								imagePath={
								place.tripadvisor_photo?.data?.[0]?.images?.medium?.url ??
								place.tripadvisor_photo?.data?.[0]?.images?.small?.url ??
								''
								}
								stars={Number(place.rating) || 0}
								country={place.address_obj.country}
								city={place.address_obj.city}
								onPress={()=>router.push(`/placeDetails/${place.location_id}`)}
							/>
						))}
					</View>
				</View>
			</View>
		</ScrollView>    
		</View>
	  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 15,
	  },
	  headingContainer: {
		alignItems: 'center',
		marginBottom: 20,
	  },
	  heading: {
		fontSize: 35,
		fontWeight: 'bold',
		color: "#35E0A1",
	  },
	  searchBarContainer: {
		alignItems: 'center',
		width: '100%',
	  },
	  searchBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 10,
		width: '100%',
		paddingHorizontal: 10,
	  },
	  icon: {
		marginRight: 10,
	  },
	  input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: '85%', // Adjust the width to prevent it from being too large on small screens
		paddingHorizontal: 15,
		borderRadius: 20,
	  },
	  loadingOverlay: {
		position: 'absolute',
		width: width,
		height: height,
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: 999,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 10,
		color: '#35E0A1',
		fontSize: 20,
	},
});
