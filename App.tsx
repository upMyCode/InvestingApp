import React from 'react';
import store, { persistor } from '@store/index';
import SplashScreen from 'react-native-splash-screen';
import StackScreen from '@screens/StackScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
	SplashScreen.hide();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StackScreen />
			</PersistGate>
		</Provider>
	);
}

export default App;
