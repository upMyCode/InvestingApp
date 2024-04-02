import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { UnRegistrationScreenParamList } from './types';
import StartScreen from '../StartScreen';
import RegistrationScreen from '../RegistrationScreen';

const Stack = createStackNavigator<UnRegistrationScreenParamList>();

export default function UnRegistrationScreenStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StartScreen'>
				<Stack.Screen name='StartScreen' component={StartScreen} />
				<Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
