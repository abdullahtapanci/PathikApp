import { Text, View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; 

import Button from '@/components/button';
import RouteContainerForSaved from '@/components/routeContainerWithDeleteButtonForSaved';
import RouteContainerForCompleted from '@/components/routeContainerWithDeleteButtonForCompleted';

import { getPaths } from "../../services/pathService";

import { useEffect, useState } from 'react';

  const { width, height } = Dimensions.get('window');

export default function VisitsScreen() {

        const router = useRouter();	

        const [isLoading, setIsLoading] = useState(false);
        const [iscompletedPaths, setIscompletedPaths] = useState(false);
        const [paths, setPaths] = useState<any[]>([]);

        const fetchSavedPaths = async () => {
                try {
                        setIsLoading(true);
                        setIscompletedPaths(false);
                        const result = await getPaths(0);
                        console.log(result);
                        setPaths(result);

                } catch (error) {
                        console.error(error);
                        Alert.alert('Failed fetching path data');
                } finally {
                        setIsLoading(false);
                }
        };

        const fetchCompletedPaths = async () => {
                try {
                        setIsLoading(true);
                        setIscompletedPaths(true);
                        const result = await getPaths(1);
                        console.log(result);
                        setPaths(result);

                } catch (error) {
                        console.error(error);
                        Alert.alert('Failed fetching path data');
                } finally {
                        setIsLoading(false);
                }
        };
        
        useEffect(()=>{
                setIscompletedPaths(false);
                fetchSavedPaths();
        },[]);

        return (
                <View style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={styles.container}>
                                        <View style={{flexDirection: "row", justifyContent:"space-between", margin: 20}}>
                                                <Text style={styles.heading}>Visits</Text>
                                                <Button label='Create your own route' onPress={()=>{router.push("/create/createRoute")}}></Button>
                                        </View>

                                        <View style={{margin: 20}}>
                                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                        <Button label='Saved routes' bgColor='#000' onPress={fetchSavedPaths}></Button>
                                                        <Button label='Completed routes' bgColor='#000' onPress={fetchCompletedPaths}></Button>
                                                </View>
                                                {!iscompletedPaths &&
                                                        <Text style={{fontSize: 15, margin: 20, fontWeight: "bold"}}>➛ Saved paths</Text>
                                                }
                                                {iscompletedPaths &&
                                                        <Text style={{fontSize: 15, margin: 20, fontWeight: "bold"}}>➛ Completed paths</Text>
                                                }
                                                {!iscompletedPaths && 
                                                        paths.map((path, index) => (
                                                                <RouteContainerForSaved
                                                                        key={index}
                                                                        id={path.id}
                                                                        name={path.name}
                                                                        imagePath={path.image}
                                                                        stars={path.stars}
                                                                        country={path.country}
                                                                        city={path.city}
                                                                        onPress={() => router.push(`/routeDetails/${path.id}`)}
                                                                />
                                                        ))
                                                }
                                                {iscompletedPaths && 
                                                        paths.map((path, index) => (
                                                                <RouteContainerForCompleted
                                                                        key={index}
                                                                        id={path.id}
                                                                        name={path.name}
                                                                        imagePath={path.image}
                                                                        stars={path.stars}
                                                                        country={path.country}
                                                                        city={path.city}
                                                                        onPress={() => router.push(`/routeDetails/${path.id}`)}
                                                                />
                                                        ))
                                                }
                                                
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
                paddingBottom: 20,
        },
        heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: "#35E0A1",
                margin: 20,
	},
});
