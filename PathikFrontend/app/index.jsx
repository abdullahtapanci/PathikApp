import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import Button from '@/components/button';

export default function mainIndex() {

    const router = useRouter();	

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Welcome to Pathik </Text>

            <Text style={{margin: 10, fontSize: 35, fontWeight: "bold"}}>Plan your kind of trip</Text>
            <Text style={{margin: 20, fontSize: 18, fontWeight: 3}}>
                Get custom recs for all the things you're into trip builder.
            </Text>

            <Text>Don't you have an account?</Text>

            <Button label="Sign up" bgColor="#000" onPress={()=>{router.push("/signup")}}></Button>

            <Text>or</Text>

            <Button label="Login" bgColor="#000" onPress={()=>{router.push("/login")}}></Button>
			
    	</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	backgroundColor: '#FFFFFF',
        alignItems: "center",
        justifyContent: "center",
  	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 10,
		color: "#35E0A1",
	},
});

