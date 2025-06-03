import { Text, View, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

import Button from '@/components/button';
import Badge from '@/components/badges';

import { router } from 'expo-router'

import { badgesData } from '@/app/(tabs)/sampleData';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function ProfileScreen() {

      
        return (
        <ScrollView>
                <View style={styles.container}>
                        <View style={{margin: 20}}>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", borderBottomWidth: 2,marginBottom:20}}>Achievements</Text>
                                </View>

                                <View style={{alignItems: "center"}}>
                                        <View style={{alignItems: "center"}}>
                                                <View style={styles.badgesContainer}>
                                                        {badgesData.map((item, index) => (
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
                height: height,
        },
        image: {
    		width: width*0.5,
    		height: height*0.23,
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
