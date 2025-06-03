import { Text, View, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getUserInfo } from "../../../services/userService";

import Button from '@/components/button';
import Badge from '@/components/badges';

import { router } from 'expo-router'

import { badgesData } from '@/app/(tabs)/sampleData';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function ProfileScreen() {

        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [username, setUsername] = useState("");
        const [image, setImage] = useState("");

        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
                const fetchUserInfo = async () => {
                    try {
                    setIsLoading(true);
                    const result = await getUserInfo();
                    setFirstName(result.firstName);
                    setLastName(result.lastName);
                    setUsername(result.username);
                    setImage(result.image);
                    } catch (error) {
                        console.error(error);
                        Alert.alert('Failed fetching user data');
                    } finally {
                        setIsLoading(false);
                    }
                };
        
                fetchUserInfo();
            }, []);

        return (
        <ScrollView>
                <View style={styles.container}>
                        <View style={{alignItems: "center"}}>
                                <Image source={{ uri: "https://media.istockphoto.com/id/696094594/vector/minimal-elephant.jpg?s=612x612&w=0&k=20&c=eEViyOBMRUX1jkPdW7ELZf85E_VH_8xUoPUXrp9DU-U=" }} style={styles.image} />
                        </View>  

                        <View style={{margin: 20, flexDirection: "row", justifyContent: "space-between"}}>
                                <View>
                                        <Text style={{fontSize: 20, fontWeight: "bold"}}>{firstName} {lastName}</Text>
                                        <Text style={{fontSize: 15}}>@{username}</Text>
                                </View>

                                <Button label='Edit' onPress={()=>{router.push("/(tabs)/(profile)/edit/editUser")}}></Button>
                        </View>

                        <View style={{margin: 20}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 2, paddingRight:screenWidth*0.2}}>Achievements</Text>
                                        <Button label='Settings' bgColor='#000' ></Button>
                                </View>

                                <View style={{alignItems: "flex-start"}}>
                                        <View style={{alignItems: "center"}}>
                                                <View style={styles.badgesContainer}>
                                                        {badgesData.slice(0, 2).map((item, index) => (
                                                                <Badge
                                                                        key={index}
                                                                        id={item.id}
                                                                        label={item.label}
                                                                        img={item.img}
                                                                        max={item.max}
                                                                        done={item.done}
                                                                        explaination={item.explanation}
                                                                        onPress={()=>router.push(`/(tabs)/(profile)/badges/${index}`)}
                                                                />
                                                        ))}
                                                </View>
                                                <Button label='View more' bgColor='#000' onPress={()=>router.push(`/(tabs)/(profile)/badges/allBadges`)}></Button>
                                        </View>
                                </View>
                        </View>

                </View>
        </ScrollView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#FFFFFF',
        },
        image: {
    		width: screenWidth*0.5,
    		height: screenHeight*0.23,
                borderWidth: 2,
    		borderRadius: 999,
		resizeMode: 'cover',
                margin: 20,
  	},
        badgesContainer: {
                padding: 5,
                borderRadius: 20,
        }
        
});
