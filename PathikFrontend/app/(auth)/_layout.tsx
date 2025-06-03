import { Stack } from 'expo-router';

export default function authLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false}}/>
            <Stack.Screen name="signup" options={{headerShown: false}}/>
        </Stack>
    );
}