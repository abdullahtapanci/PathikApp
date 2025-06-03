import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Dimensions, Text, Image, ScrollView, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import Badge from '@/components/badges';
import { badgesData } from '@/app/(tabs)/sampleData';

const { width, height } = Dimensions.get('window');

export default function BadgeDetail() {
  const { index } = useLocalSearchParams();

  console.log(index);

  const badgeIndex = Number(index);
  const data = badgesData[badgeIndex];

  const router = useRouter();	

  return (
    <View style={styles.container}>
        <ScrollView>

        <View style={{alignItems: "flex-start"}}>
            <View style={{alignItems: "center"}}>
                <View style={styles.badgesContainer}>      
                    <Badge
                            id={data.id}
                            label={data.label}
                            img={data.img}
                            max={data.max}
                            done={data.done}
                            explaination={data.explanation}
                            onPress={()=>router.push(`/(tabs)/(profile)/badges/${index}`)}
                    />
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
    alignItems:"center",
    paddingTop:20,
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
  badgesContainer: {
                padding: 5,
                borderRadius: 20,
        }
});