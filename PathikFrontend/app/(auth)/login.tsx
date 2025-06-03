import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {useAuth} from '../../context/authContext'


import Button from '@/components/button';

export default function loginScreen() {

    const router = useRouter();	

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleSignin } = useAuth();

    const onSubmit = async () => {
            try {
                await handleSignin(email, password);
            } catch (error) {
                console.error(error);
                Alert.alert('Signin failed');
            }
        };

	return (
		<View style={styles.container}>
	        <Text style={{fontSize:25, fontWeight: "bold", margin: 20}}>Welcome back.</Text>

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

            <Button label="Login" onPress={onSubmit}/>

            <Text style={{marginVertical:10}}>Don't you have an account?</Text>

            <Button label="Join" onPress={()=>{router.push("/signup")}}/>

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
	  },
});
