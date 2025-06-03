import { Text, View, StyleSheet, TextInput, Alert, ActivityIndicator, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {useAuth} from '../../context/authContext'

const { width, height } = Dimensions.get('window');


import Button from '@/components/button';

export default function signupScreen() {

    const router = useRouter();	

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { handleSignup } = useAuth();

    const onSubmit = async () => {
        try {
            await handleSignup(name, surname, username, email, password);
        } catch (error) {
            console.error(error);
            Alert.alert('Signup failed');
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
	        <Text style={{fontSize:25, fontWeight: "bold", margin: 20}}>Join to unlock the best of Pathik</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={(text) => setSurname(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

            <Button label="Join" onPress={onSubmit}/>

            <Text style={{marginVertical:10}}>Do you have an account?</Text>

            <Button label="Login" onPress={() => { router.push("/login"); } }/>

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
      input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: '85%', // Adjust the width to prevent it from being too large on small screens
		paddingHorizontal: 15,
		borderRadius: 20,
        marginVertical: 15,
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
