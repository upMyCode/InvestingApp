import { jest } from '@jest/globals';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

import 'react-native-gesture-handler/jestSetup';

jest.mock('@env', () => ({
	API_HOST: 'test.com',
	STADIA_MAPS_API_KEY: 'c1111e11-b111-11e1-9bf1-e58c7fc8fc23',
}));

jest.mock('@sentry/react-native', () => ({
	init: jest.fn(),
	ReactNavigationInstrumentation: jest.fn(),
	ReactNativeTracing: jest.fn(),
}));

jest.mock('@react-native-community/geolocation', () => ({
	addListener: jest.fn(),
	getCurrentPosition: jest.fn(),
	removeListeners: jest.fn(),
	requestAuthorization: jest.fn(),
	setConfiguration: jest.fn(),
	startObserving: jest.fn(),
	stopObserving: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: () => ['key'] }),
	Trans: () => jest.fn(),
	t: () => jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {});

jest.mock('./assets/icons/login.svg', () => 'LoginIcon');
jest.mock('./assets/icons/chevronDown.svg', () => 'ChevronDown');
jest.mock('./assets/icons/chevronUp.svg', () => 'ChevronUp');
jest.mock('./assets/icons/checkIcon.svg', () => 'CheckIcon');
jest.mock('./assets/icons/close.svg', () => 'CloseIcon');

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock');

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
});

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: jest.fn(),
			dispatch: jest.fn(),
			addListener: jest.fn().mockImplementation((event, callback) => {
				callback();
			}),
			canGoBack: jest.fn(),
			getParent: jest.fn(),
			getState: jest.fn().mockReturnValue({
				routeNames: [],
			}),
			goBack: jest.fn(),
			isFocused: jest.fn(),
			pop: jest.fn(),
			popToTop: jest.fn(),
			push: jest.fn(),
			removeListener: jest.fn(),
			replace: jest.fn(),
			reset: jest.fn(),
			setOptions: jest.fn(),
			setParams: jest.fn(),
		}),
	};
});

jest.mock('@providers/hooks', () => ({
	...jest.requireActual('@providers/hooks'),
	useNetwork: () => ({ isConnected: true }),
	useSynchronization: () => ({
		clearAllTypesCache: jest.fn(),
		setSynchronizationDate: jest.fn(),
		needSynchronization: false,
		wasSynchronizedToday: true,
	}),
	useProfile: () => ({
		profileData: { name: 'Name Test', surname: 'Surname Test', regionId: '45', districtId: '252' },
	}),
}));
