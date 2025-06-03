import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Alert, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import {deletePathById, updatePathIsComplete} from "../services/pathService";

import {useState} from 'react';

import Stars from '@/components/stars';
import Button from './button';

const { width, height } = Dimensions.get('window');

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


export default function routeContainerWithDeleteButtonforSaved({ id, name, imagePath, stars, country, city, onPress }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id: number)=>{
        try {
            setIsLoading(true);
            const result = await deletePathById(id);
            Alert.alert(result);
        } catch (error) {
            console.error('Failed to delete path:', error);
        }finally {
            setIsLoading(false);
        }
    }

    const handleUpdateIsComplete = async (id:number, num:number)=>{
        try {
            setIsLoading(true);
            const result = await updatePathIsComplete(id,num);
            Alert.alert(result);
        } catch (error) {
            console.error('Failed to update path as complete:', error);
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <Pressable onPress={onPress}>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
                <Text style={styles.loadingText}>Searching places...</Text>
                </View>
            )}
            <View style={styles.container}>
                <Image source={{ uri: imagePath }} style={styles.image} />

                <View style={{display: "flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.details}>{stars} <Stars rating={stars} starSize={20} /></Text>
                        <Text style={styles.details}>{country}, {city}</Text>
                    </View>
                    <Button onPress={()=>handleUpdateIsComplete(id, 1)}><Feather name="check" size={24} color="white" /></Button>
                    <Button bgColor='#FF0032' onPress={()=>handleDelete(id)}><Feather name="trash-2" size={24} color="white" /></Button>
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
