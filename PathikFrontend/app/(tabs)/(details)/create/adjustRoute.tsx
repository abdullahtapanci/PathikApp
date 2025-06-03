import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Dimensions, Text, ScrollView, TextInput, Alert, ActivityIndicator, Platform, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { searchPlace } from "../../../../services/placeService";
import { createPath } from "../../../../services/pathService";


import AddPlaceContainer from '@/components/addPlaceContainer'
import RemovePlaceContainer from '@/components/removePlaceContainer'
import Button from '@/components/button';

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

interface placesId{
  location_id: string;
}

interface PathInsertDTO{
  name: string;
  city: string;
  country: string;
  placesIds: placesId[];
  token: string;
  image: string;
}

export default function adjustRoute() {

  const { places } = useLocalSearchParams();

  console.log('places param:', places);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryResult, setSearchQueryResult] = useState<Place[] | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savePathVisibility, setSavePathVisibility] = useState(false);
  const [pathName, setPathName] = useState('');

    useEffect(() => {
    if (places) {
        try {
        const parsed = JSON.parse(places as string);
        setSelectedPlaces(parsed);
        } catch (e) {
        console.error('Failed to parse places:', e);
        }
    }
    }, [places]);


  const handleSearch = async () => {
    try{
      setIsLoading(true);
      const result = await searchPlace(searchQuery);
      setSearchQueryResult(result);
    }catch(error){
      console.error(error);
      Alert.alert('failed fetching place data');
    }finally {
      setIsLoading(false);
    }
  };

  const handleAddPlace = (place: Place) => {
    const alreadyAdded = selectedPlaces.find(p => p.location_id === place.location_id);
    if (!alreadyAdded) {
      setSelectedPlaces(prev => [...prev, place]);
    }
  };

  const handleRemovePlace = (place: Place) => {
    setSelectedPlaces(prev => prev.filter(p => p.location_id !== place.location_id));
  };

  const savePath = ()=>{
    if(selectedPlaces.length===0){
      Alert.alert("Chose at least one place.");
    }else{
      setSavePathVisibility(true);
    }
  }

  const handleSavePath = async () => {
    if (pathName.trim() === '') {
      Alert.alert('Please enter a path name.');
      return;
    }

    const placesIds: placesId[] = selectedPlaces.map(place => ({
      location_id: place.location_id,
    }));

    const token = await AsyncStorage.getItem("token");
    
    const PathInsertDTO ={
      name: pathName,
      city: selectedPlaces[0].address_obj.city,
      country: selectedPlaces[0].address_obj.country,
      placesIds: placesIds,
      token: token,
      image: selectedPlaces[0].tripadvisor_photo.data[0].images.medium.url,
    };

    try{
      setIsLoading(true);
      console.log("PathInsertDTO: is", JSON.stringify(PathInsertDTO, null, 2));
      const result = await createPath(PathInsertDTO);
      console.log(result);
      router.push("/(tabs)/visits");
    }catch(error){
      console.error(error);
      Alert.alert('failed creating path data');
    }finally {
      setIsLoading(false);
    }

    setSavePathVisibility(false);
    setPathName('');
  };

  const handleCancel = () => {
    setSavePathVisibility(false);
    setPathName('');
  };

  const router = useRouter();	

  return (
    <View style={styles.container}>
      <ScrollView>      
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
            <Text style={styles.loadingText}>Searching places...</Text>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={savePathVisibility}
          onRequestClose={() => setSavePathVisibility(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            <View style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              elevation: 5
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Enter Path Name</Text>
              <TextInput
                placeholder="My Awesome Path"
                value={pathName}
                onChangeText={setPathName}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 20
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button label="Cancel" onPress={handleCancel} bgColor="#ccc" textColor="#000" />
                <Button label="Save" onPress={handleSavePath} bgColor="#35E0A1" textColor="#fff" />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.mapWrapper}>
            {Platform.OS === 'web' ? (
              <></>
            ) : (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 41.00959064116835,
                  longitude: 28.980263531839313,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                  
                }}
                zoomEnabled={true}          // enable zoom gestures (pinch)
                scrollEnabled={true}        // enable panning (drag)
                pitchEnabled={true}         // optional: allow tilt with two fingers
                rotateEnabled={true}        // optional: allow map rotation
              >
                {selectedPlaces.length > 0 && (
              <>
                {/* Path connecting selected places */}
                <Polyline
                  coordinates={selectedPlaces.map(place => ({
                    latitude: parseFloat(place.latitude),
                    longitude: parseFloat(place.longitude),
                  }))}
                  strokeColor="#35E0A1"
                  strokeWidth={4}
                />

                {/* Markers for each selected place */}
                {selectedPlaces.map((place, index) => (
                  <Marker
                    key={place.location_id}
                    coordinate={{
                      latitude: parseFloat(place.latitude),
                      longitude: parseFloat(place.longitude),
                    }}
                    title={place.name}
                    description={`${place.address_obj.city}, ${place.address_obj.country}`}
                  />
                ))}
              </>
            )}
            </MapView>
            )}
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
          </View>

          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            <View style={{alignItems:"center", justifyContent:"center", marginBottom: 20}}>
              <Button label="Optimize route"></Button>
            </View>
            <View style={{alignItems:"center", justifyContent:"center", marginBottom: 20}}>
              <Button label="Save" onPress={savePath}></Button>
            </View>
          </View>

          <Text style={{fontSize:15, fontWeight:"bold", margin: 20}}>Stops</Text>
  
          {selectedPlaces.map((place) => (
            <RemovePlaceContainer
              id={place.location_id} 
              key={place.location_id} 
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
              onRemove={() => handleRemovePlace(place)}
            />
          ))}

          <Text style={{fontSize:15, fontWeight:"bold", margin: 20}}>Search results</Text>

          {searchQueryResult && searchQueryResult.map((place) => (
            <AddPlaceContainer
              id={place.location_id} 
              key={place.location_id} 
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
              onAdd={() => handleAddPlace(place)}
            />
          ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  searchBarContainer: {
		alignItems: 'center',
		width: '100%',
    marginVertical: 20,
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