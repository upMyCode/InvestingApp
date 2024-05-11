import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalculatorScreen from '@screens/CalculatorScreen';
import AnalyticsScreen from '@screens/AnalyticsScreen';

import type { StackScreensParamList } from './types';

const Stack = createStackNavigator<StackScreensParamList>();

const AnalyticsStackScreen = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AnalyticsScreen'>
			<Stack.Screen name='AnalyticsScreen' component={AnalyticsScreen} />
			<Stack.Screen name='CalculatorScreen' component={CalculatorScreen} />
		</Stack.Navigator>
	);
};

export default AnalyticsStackScreen;
