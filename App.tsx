import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store, { persistor } from '@store/index';
import SplashScreen from 'react-native-splash-screen';
import StackScreen from '@screens/StackScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
	SplashScreen.hide();

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
			<PersistGate loading={null} persistor={persistor}>
				<StackScreen />
			</PersistGate>
		</Provider>
	);
}

export default App;
