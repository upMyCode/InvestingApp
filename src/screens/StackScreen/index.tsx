import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenParamList } from './types';
import StartScreen from '../StartScreen';
import RegistrationScreen from '../RegistrationScreen';
import LogInScreen from '../LogInScreen';
import { useAppSelector } from '@store/hooks';

const Stack = createStackNavigator<StackScreenParamList>();

export default function StackScreen() {
	const userData = useAppSelector((store) => store.createUserSlice.user);
	const isUserExists = !!userData;

	return (
		<NavigationContainer>
			{!isUserExists ? (
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StartScreen'>
					<Stack.Screen name='StartScreen' component={StartScreen} />
					<Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
					<Stack.Screen name='LogInScreen' component={LogInScreen} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StartScreen'>
					<Stack.Screen name='LogInScreen' component={LogInScreen} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}
