import { Text, View, StyleSheet, TextInput, Alert, ActivityIndicator, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '@/components/button'; 

import { verifyEmail } from "../../services/authService";

const { width, height } = Dimensions.get('window');

export default function VerifyEmailScreen() {
  const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [code, setCode] = useState('');


  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert("Validation Error", "Please enter the verification code.");
      return;
    }

    try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("token");
        const result = await verifyEmail(token, code);
        if(result.success){
            if(result.data==="success"){
                router.push("/(auth)/login");
            }else{
                Alert.alert("Wrong verification code.");
            }
        }else{
            Alert.alert("Something went wrong!");
            router.push("/(auth)/login");
        }
    } catch (error) {
      
    }
  };

  return (
    <View style={styles.container}>
    {isLoading && (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
                <Text style={styles.loadingText}>Processing...</Text>
        </View>
        )}
      <Text style={styles.title}>Email Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <Button label="Verify" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#35E0A1",
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },loadingOverlay: {
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