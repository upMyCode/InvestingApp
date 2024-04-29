import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalculatorScreen from '@screens/CalculatorScreen';

import type { StackScreensParamList } from './types';

const Stack = createStackNavigator<StackScreensParamList>();

const AnalyticsStackScreen = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='CalculatorScreen'>
			<Stack.Screen name='AnalyticsScreen' component={() => <></>} />
			<Stack.Screen name='CalculatorScreen' component={CalculatorScreen} />
		</Stack.Navigator>
	);
};

export default AnalyticsStackScreen;
