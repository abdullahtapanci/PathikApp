import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Dimensions, ScrollView, Text, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useEffect, useState } from 'react';

import { getPath } from "../../../../services/pathService";
import { searchPlaceWithID, getNearbyLocations } from "../../../../services/placeService";

const { width, height } = Dimensions.get('window');

import { commentsData } from '@/app/(tabs)/sampleData';

import PlaceContainer from '@/components/placeContainer';
import Button from '@/components/button';
import Stars from '@/components/stars';
import Comment from '@/components/comment';


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
  large: ImageInfo;
  original: ImageInfo;
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

export default function routeDetail() {

  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState<any>(null);
  const [placesDetails, setPlacesDetails] = useState<any[]>([]);
  const [nearbyLocations, setNearbyLocations] = useState<Place[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  const fetchPath = async () => {
          try {
                  setIsLoading(true);
                  const result = await getPath(id);
                  console.log(result);
                  setPath(result);

                  // Iterate over each place and fetch full place details
                  const fetchedPlaces = await Promise.all(
                    result.places.map(async (place: { location_id: string }) => {
                      try {
                        const placeResult = await searchPlaceWithID(place.location_id);
                        return placeResult;
                      } catch (error) {
                        console.error(`Failed to fetch details for location_id: ${place.location_id}`, error);
                        return null;
                      }
                    })
                  );

                  setPlacesDetails(fetchedPlaces.filter(Boolean));
                  console.log("şdlmfşwlmcpwmcwemcpemnfpvnefnvpenfv:  "+JSON.stringify(fetchedPlaces.filter(Boolean), null, 2));


                  const nearbyLocationsResult = await getNearbyLocations(fetchedPlaces[0].latitude, fetchedPlaces[0].longitude, "");
                  setNearbyLocations(nearbyLocationsResult);


          } catch (error) {
                  console.error(error);
                  Alert.alert('Failed fetching path data');
          } finally {
                  setIsLoading(false);
          }
  };

  const handleFilterPress = async (category: Category) => {
      setSelectedFilter(category);
  
      try {
        setIsLoading(true);
        const nearbyLocationsResultWithCategory = await getNearbyLocations(
        placesDetails[0]?.latitude,
        placesDetails[0]?.longitude,
        category
      );
        setNearbyLocations(nearbyLocationsResultWithCategory);
      } catch (error) {
        console.error('Failed to fetch nearby locations:', error);
      }finally {
        setIsLoading(false);
      }
    };

  useEffect(()=>{
    fetchPath();
  },[id]);

  const coordinates = placesDetails.map((place) => ({
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude),
  }));
  

  const [commentScreenVisibility, setCommentScreenVisibility] = useState(false);
  const [userComment, setUserComment] = useState('');

  const router = useRouter();	

  type Category = 'hotels' | 'attractions' | 'restaurants';
  const FilterButtons: { label: Category; bgColor: string; textColor: string }[] = [
    { label: 'hotels', bgColor: '#000000', textColor: '#FFFFFF' },
    { label: 'attractions', bgColor: '#000000', textColor: '#FFFFFF' },
    { label: 'restaurants', bgColor: '#000000', textColor: '#FFFFFF' },
  ];

  return (
    <View style={styles.container}>
       {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
            <Text style={styles.loadingText}>Searching places...</Text>
          </View>
        )}
      <ScrollView>

      <Modal
        visible={commentScreenVisibility}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCommentScreenVisibility(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Drop a comment</Text>
            <TextInput
              placeholder="Type here..."
              value={userComment}
              onChangeText={setUserComment}
              style={styles.input}
              multiline={true}
              textAlignVertical="top"
            />
            <Button label="Submit" onPress={() => {setCommentScreenVisibility(false);}} />
          </View>
        </View>
      </Modal>


        <View style={styles.mapWrapper}>
          <MapView
              style={styles.map}
              initialRegion={{
                latitude: 41.00959064116835,
                longitude: 28.980263531839313,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {/* Path connecting all four locations */}
              <Polyline
                coordinates={coordinates}
                strokeColor="#35E0A1" // Path color
                strokeWidth={4}       // Thickness of the path
              />

              {/* Markers for each location */}
              {coordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  title={`Location ${index + 1}`}
                  description={`This is location ${index + 1}`}
                />
              ))}
          </MapView>
        </View>
        
        <View style={styles.buttons}>
          <Button label="Save" ></Button>
          <Button label="Write a review" onPress={() => setCommentScreenVisibility(true)}></Button>
          <Button label="Adjust" onPress={()=>{
            router.push({
              pathname: `/(tabs)/(details)/create/adjustRoute`,
              params: {
                places: JSON.stringify(placesDetails),
              },
            });
          }}></Button>
        </View>

        {path && (
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{path.name}</Text>
            <View style={styles.subInfoContainer}>
              <Text style={styles.details}>
                {path.stars} <Stars rating={path.stars} starSize={20} />
              </Text>
              <Text style={styles.details}>{path.country}, {path.city}</Text>
            </View>
          </View>
        )}

        <View style={{margin: 10}}>
          <Button label="Stops" bgColor='#000000' textColor='#FFFFFF'></Button>
        </View>

        <View style={styles.nearbyContainer}>
          {placesDetails.map((place, index) => (
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

        <View style={styles.nearbyContainer}>
          <Button label='What is Nearby'></Button>

          <View style={styles.filterButtonContainer}>
            <ScrollView horizontal={true} style={styles.filterButtonScrollContainer}>
              {FilterButtons.map((item, index) => (
                <Button key={index} label={item.label} bgColor={item.bgColor} textColor={item.textColor} onPress={() => handleFilterPress(item.label)}></Button>
              ))}
            </ScrollView>
          </View>
          
          {nearbyLocations?.map((place) => (
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

        <View style={styles.commentsContainer}>

          <View style={{alignItems: "center"}}>
            <Text style={[styles.heading,  {marginVertical:40} ]}>See what travellers are saying</Text>
          </View>

          {commentsData.map((item, index) => (
            <Comment
              key={index}
              id={item.id}
              name={item.name}
              profileImage={item.imagePath}
              stars={item.stars}
              written={item.written}
              visited={item.visited}
              text={item.text}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 10,
		color: "#000000",
	},
  mapWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    margin: 10,
    height: height * 0.35,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    padding: 12,
  },
  subInfoContainer: {
    flexDirection: "row",
  },
  details: {
    fontSize: 15,
    color: '#555',
    paddingBottom: 3,
    margin: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttons: {
    margin: 10,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nearbyContainer: {
    flex: 4,
    marginBottom: 10,
    marginTop: 2,
    padding: 5,
  },
  filterButtonContainer: {
    padding: 10,
  },
  filterButtonScrollContainer: {
    flexDirection: 'row',
  },
  commentsContainer: {
    flex: 4,
    marginBottom: 10,
    marginTop: 2,
    padding: 5,
    backgroundColor: "#F2F1EB",
    borderRadius: 20,
  },





  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
		height: 200,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 15,
		borderRadius: 20,
    marginVertical: 20, 
    textAlignVertical: 'top',
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