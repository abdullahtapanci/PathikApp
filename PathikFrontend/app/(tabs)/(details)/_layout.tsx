import { Stack } from 'expo-router';

export default function routeDetailsLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{headerShown: false}}/>
			<Stack.Screen name="routeDetails" options={{headerShown: false}}/>
			<Stack.Screen name="placeDetails" options={{headerShown: false}}/>
        </Stack>
  	);
}
