import { Stack } from 'expo-router';

export default function profileDetailsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    );
}
