import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenParamList } from './types';
import StartScreen from '../StartScreen';
import RegistrationScreen from '../RegistrationScreen';
import LogInScreen from '../LogInScreen';
import TabScreens from '../TabScreens';
import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

const Stack = createStackNavigator<StackScreenParamList>();

export default function StackScreen() {
	const userData = useAppSelector((store) => store.createUserSlice.user);
	const isUserExists = !!userData;

	useEffect(() => {
		console.log('Change user navigation');
	}, [userData]);

	return (
		<NavigationContainer>
			{!isUserExists ? (
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StartScreen'>
					<Stack.Screen name='StartScreen' component={StartScreen} />
					<Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
					<Stack.Screen name='LogInScreen' component={LogInScreen} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='TabScreens'>
					<Stack.Screen name='TabScreens' component={TabScreens} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}
