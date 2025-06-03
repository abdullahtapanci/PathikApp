import { useRouter } from 'expo-router';
import { View, StyleSheet, Dimensions, Text, ScrollView, TextInput, Alert, ActivityIndicator, Platform, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import { router } from 'expo-router'

import { getUserInfo, updateUser, updateUserEmail, updateUserPassword } from "../../../../services/userService";

const { width, height } = Dimensions.get('window');


export interface user{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  image: string;
}
export interface updateDTO{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};
export interface updateEmail{
  email: string;
  newEmail: string;
};
export interface updatePassword{
  email: string;
  newPassword: string;
};

export default function editUser() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");

    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
            setEmail(result.email);
            setPassword(result.password);
            } catch (error) {
            console.error(error);
            Alert.alert('Failed fetching user data');
            } finally {
            setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const updateUserInfo = async ()=>{
        try {
            setIsLoading(true);

            const updateDTO = {
                firstName,
                lastName,
                username,
                email,
            };

            const response = await updateUser(updateDTO);

            if (response) {
                Alert.alert("Success", "User info updated successfully");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to update user info");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            setIsLoading(true);
            
            const updateEmail = {
                email,
                newEmail,
            };

            await updateUserEmail(updateEmail);
            setEmail(newEmail);
            Alert.alert("Success", "Email updated");
            setShowEmailModal(false);
            router.push("/(auth)/login");
        } catch (error) {
            Alert.alert("Error", "Failed to update email");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            setIsLoading(true);
            
            const updatePassword = {
                email,
                newPassword,
            };

            await updateUserPassword( updatePassword );
            Alert.alert("Success", "Password updated");
            setShowPasswordModal(false);
        } catch (error) {
            Alert.alert("Error", "Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <ScrollView style={{padding:20}}> 
            {isLoading && (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#35E0A1" style={{ transform: [{ scale: 2 }] }}/>
                <Text style={styles.loadingText}>Searching places...</Text>
            </View>
            )}
            <Modal visible={showEmailModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Update Email</Text>
                    <TextInput
                        style={[styles.input, {width:width*0.8}]}
                        placeholder="New Email"
                        value={newEmail}
                        onChangeText={setNewEmail}
                    />
                    <Button label="Update Email" textColor="white" onPress={handleUpdateEmail} />
                    <Button label="Cancel" textColor="white" onPress={() => setShowEmailModal(false)} />
                    </View>
                </View>
            </Modal>

            <Modal visible={showPasswordModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Update Password</Text>
                    <TextInput
                        style={[styles.input, {width:width*0.8}]}
                        placeholder="New Password"
                        value={newPassword}
                        secureTextEntry
                        onChangeText={setNewPassword}
                    />
                    <Button label="Update Password" textColor="white" onPress={handleUpdatePassword} />
                    <Button label="Cancel" textColor="white" onPress={() => setShowPasswordModal(false)} />
                    </View>
                </View>
            </Modal>
            <View style={{alignItems: "center"}}>
                    <Image source={{ uri: "https://media.istockphoto.com/id/696094594/vector/minimal-elephant.jpg?s=612x612&w=0&k=20&c=eEViyOBMRUX1jkPdW7ELZf85E_VH_8xUoPUXrp9DU-U=" }} style={styles.image} />
            </View>     
            <View style={{display:"flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>First Name</Text>
                <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="#888"
                />
            </View>
            <View style={{display:"flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>Last Name</Text>
                <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#888"
                />
            </View>
            <View style={{display:"flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>Username</Text>
                <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#888"
                />
            </View>
            <View style={{alignItems:"center"}}>
                <Button label='Save Changes' textColor='white' onPress={updateUserInfo}></Button>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{alignItems:"center"}}>
                    <Button label='Change Password' textColor='white' onPress={() => setShowPasswordModal(true)}></Button>
                </View>
                <View style={{alignItems:"center"}}>
                    <Button label='Change Email' textColor='white' onPress={() => setShowEmailModal(true)}></Button>
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
    height:height,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: 'black',
    width:width*0.9,
    fontWeight:"bold",
  },
  image: {
        width: width*0.5,
        height: height*0.23,
        borderWidth: 2,
        borderRadius: 999,
        resizeMode: 'cover',
        margin: 20,
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
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: '90%',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 10,
  elevation: 5,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
});