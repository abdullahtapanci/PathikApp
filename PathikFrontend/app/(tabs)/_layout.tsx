import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
	return (
		<Tabs 
			screenOptions={{
				tabBarActiveTintColor: '#35E0A1',
				headerShown: false,
				tabBarLabel :"",
      			}}
		>
			<Tabs.Screen 
				name="(details)" 
				options={{ 
					tabBarIcon: ({ color, focused }) => (
                                            <FontAwesome6 name={focused ? 'compass' : 'compass'} color={color} size={24} />
                                        ),
				}} 
			/>
			<Tabs.Screen 
				name="search" 
				options={{ 
					tabBarIcon: ({ color, focused }) => (
                                            <Feather name={focused ? 'search' : 'search'} color={color} size={24} />
                                        ),
				}} 
			/>
			<Tabs.Screen 
				name="visits" 
				options={{ 
					tabBarIcon: ({ color, focused }) => (
                                            <FontAwesome6 name={focused ? 'route' : 'route'} color={color} size={24} />
                                        ),
				}} 
			/>
			<Tabs.Screen 
				name="(profile)" 
				options={{ 
                                        tabBarIcon: ({ color, focused }) => (
                                            <FontAwesome name={focused ? 'user-o' : 'user-o'} color={color} size={24} />
                                        ), 
				}} 
			/>
		</Tabs>
	);
}

