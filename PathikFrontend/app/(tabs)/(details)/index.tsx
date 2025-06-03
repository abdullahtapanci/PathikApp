import { Text, View, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; 

import RouteContainer from '@/components/routeContainer';

import { routesData } from '@/app/(tabs)/sampleData';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getAllPaths } from "../../../services/pathService"
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Index() {
	
	const router = useRouter();	

	const [isLoading, setIsLoading] = useState(false);
	const [paths, setPaths] = useState<any[]>([]);

	const handleGetAllPaths = async () => {
		  try{
			setIsLoading(true);
			while(true){
				const token = await AsyncStorage.getItem("token");
				if(token){
					break;
				}
			}
			const result = await getAllPaths();
			setPaths(result);
			console.log(result);
		  }catch(error){
			console.error(error);
			Alert.alert('failed fetching all path data');
		  }finally {
			setIsLoading(false);
		  }
	};


	useFocusEffect(
	useCallback(() => {
		handleGetAllPaths();
	}, [])
	);

	return (
		<View style={styles.container}>
			{isLoading && (
			<View style={styles.loadingOverlay}>
				<ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
				<Text style={styles.loadingText}>Searching items...</Text>
			</View>
			)}
			<Text style={styles.heading}>Popular Routes</Text>
			
			<ScrollView>
      				{paths.map((item, index) => (
        				<RouteContainer
          					key={index}
							id={item.id}
          					name={item.name}
          					imagePath={item.image}
          					stars={item.stars}
          					country={item.country}
          					city={item.city}
							onPress={()=>router.push(`/routeDetails/${item.id}`)}
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
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 10,
		color: "#35E0A1",
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

