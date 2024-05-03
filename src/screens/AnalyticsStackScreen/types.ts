import { NavigationProp, RouteProp } from '@react-navigation/native';

export type StackScreensParamList = {
	AnalyticsScreen: undefined;
	CalculatorScreen: undefined;
};

export type RootRouteProps<RouteName extends keyof StackScreensParamList> = RouteProp<StackScreensParamList, RouteName>;

export type StackNavigation = NavigationProp<StackScreensParamList>;
