import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store, { persistor } from '@store/index';
import SplashScreen from 'react-native-splash-screen';
import StackScreen from '@screens/StackScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeBaseProvider } from 'native-base';

function App(): React.JSX.Element {
	useEffect(() => {
		const ac = new AbortController();

		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);

		return function cleanup() {
			ac.abort();
		};
	}, []);

	// If you want to clear persist state use it
	const clearAppData = async function () {
		try {
			const keys = await AsyncStorage.getAllKeys();
			await AsyncStorage.multiRemove(keys);
		} catch (error) {
			console.error('Error clearing app data.');
		}
	};

	// clearAppData();

	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<PersistGate loading={null} persistor={persistor}>
					<StackScreen />
				</PersistGate>
			</NativeBaseProvider>
		</Provider>
	);
}

export default App;
