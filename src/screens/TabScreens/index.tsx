/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabBarItem from '@components/TabBarItem';
import { isDisableTabBarInterface } from '@helpers/isDisableTabBarInterface';
import React from 'react';
import { View } from 'react-native';

import inlineStyle from './styles';
import { TabScreensParamList } from './types';

export default function TabScreens() {
	const Tab = createBottomTabNavigator<TabScreensParamList>();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: inlineStyle.tabStyle,
			}}
			initialRouteName='HomeStackScreen'
		>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((routes) => {
							const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							if (isDisableTabBarInterface(routeName, ['CalculatorScreen'])) {
								return {
									display: 'none',
								};
							}

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='HomeScreen' isFocused={focused} />;
						},
					};
				}}
				key='HomeStackScreen'
				name='HomeStackScreen'
				component={() => <View></View>}
			/>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((_routes) => {
							// const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='AnalyticsScreen' isFocused={focused} />;
						},
					};
				}}
				key='AnalyticsScreen'
				name='AnalyticsScreen'
				component={() => <View></View>}
			/>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((_routes) => {
							// const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='PortfolioScreen' isFocused={focused} />;
						},
					};
				}}
				name='PortfolioScreen'
				component={() => <View></View>}
			/>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((_routes) => {
							// const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='ChatScreen' isFocused={focused} />;
						},
					};
				}}
				key='ChatScreen'
				name='ChatScreen'
				component={() => <View></View>}
			/>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((_routes) => {
							// const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='UserProfileScreen' isFocused={focused} />;
						},
					};
				}}
				key='UserProfileScreen'
				name='UserProfileScreen'
				component={() => <View></View>}
			/>
		</Tab.Navigator>
	);
}
