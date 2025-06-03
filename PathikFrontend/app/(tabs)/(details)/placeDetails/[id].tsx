import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Dimensions, Text, Image, ScrollView, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React, { useEffect, useState } from 'react';

import Stars from '@/components/stars';
import Button from '@/components/button';
import PlaceContainer from '@/components/placeContainer';
import Comment from '@/components/comment';

import { searchPlaceWithID, getNearbyLocations } from "../../../../services/placeService";

import { commentsData } from '@/app/(tabs)/sampleData';

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

export default function placeDetail() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [searchPlaceWithIDResult, setSearchPlaceWithIDResult] = useState<Place | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Place[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(()=>{
    const handleSearch = async () => {
      try{
        setIsLoading(true);
        const result = await searchPlaceWithID(id);
        setSearchPlaceWithIDResult(result);
        if (result?.tripadvisor_photo?.data) {
          const fallbackImages = result.tripadvisor_photo.data
            .map((photo: { images: { original: { url: string } | null; large: { url: string } } }) =>
              photo.images.original?.url || photo.images.large.url
            )
            .filter(Boolean);
          setImages(fallbackImages);

          const nearbyLocationsResult = await getNearbyLocations(result.latitude, result.longitude, "");
          setNearbyLocations(nearbyLocationsResult);
        }
      }catch(error){
        console.error(error);
        Alert.alert('failed fetching place data');
      }finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  },[]);

  const handleFilterPress = async (category: Category) => {
    setSelectedFilter(category);

    try {
      setIsLoading(true);
      const nearbyLocationsResultWithCategory = await getNearbyLocations(
      searchPlaceWithIDResult?.latitude,
      searchPlaceWithIDResult?.longitude,
      category
    );
      setNearbyLocations(nearbyLocationsResultWithCategory);
    } catch (error) {
      console.error('Failed to fetch nearby locations:', error);
    }finally {
      setIsLoading(false);
    }
  };


    

  const router = useRouter();	

  const [commentScreenVisibility, setCommentScreenVisibility] = useState(false);
  const [userComment, setUserComment] = useState('');


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
        {images && images.length > 0 && (
          <Carousel
            width={width}
            height={height * 0.3}
            data={images}
            autoPlay
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.image}
              />
            )}
          />
        )}

        

        <View>
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
        </View>



        <View style={styles.infoContainer}>
          <Text style={styles.name}>{searchPlaceWithIDResult?.name}</Text>
          <Text style={styles.details}>{searchPlaceWithIDResult?.rating} <Stars rating={Number(searchPlaceWithIDResult?.rating)} starSize={20} /></Text>
          <Text style={styles.details}>{searchPlaceWithIDResult?.address_obj.country}, {searchPlaceWithIDResult?.address_obj.city}</Text>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.name}>About</Text>
          <Text style={styles.details}>
              {searchPlaceWithIDResult?.description}
          </Text>
        </View>

        <View style={styles.aboutContainer}>

          <View style={styles.buttons}>
            <Button label='What is Nearby'></Button>
            <Button label="Write a review" onPress={() => setCommentScreenVisibility(true)}></Button>
          </View>

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
  image: {
    height: height*0.3,
    borderRadius: 12,
    margin: 10,
		resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    padding: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: "#000000",
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
  aboutContainer: {
    flex: 4,
    marginBottom: 10,
    marginTop: 2,
    marginHorizontal: 10,
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
  buttons: {
    margin: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
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