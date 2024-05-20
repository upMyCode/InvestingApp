/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabBarItem from '@components/TabBarItem';
import { isDisableTabBarInterface } from '@helpers/isDisableTabBarInterface';
import React from 'react';
import { View } from 'react-native';
import AnalyticsStackScreen from '@screens/AnalyticsStackScreen';
import HomeScreen from '@screens/HomeScreen';
import PortfolioScreen from '@screens/PortfolioScreen';
import UserProfileScreen from '@screens/UserProfileScreen';
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
				key='HomeScreen'
				name='HomeScreen'
				component={HomeScreen}
			/>
			<Tab.Screen
				options={({ route }) => {
					return {
						tabBarStyle: ((_routes) => {
							// const routeName = getFocusedRouteNameFromRoute(routes) ?? '';

							return inlineStyle.disabledRedirectionBar;
						})(route),

						tabBarIcon: ({ focused }) => {
							return <TabBarItem label='AnalyticsStackScreen' isFocused={focused} />;
						},
					};
				}}
				key='AnalyticsStackScreen'
				name='AnalyticsStackScreen'
				component={AnalyticsStackScreen}
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
				component={PortfolioScreen}
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
				component={UserProfileScreen}
			/>
		</Tab.Navigator>
	);
}
