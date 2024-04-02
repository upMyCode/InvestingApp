import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import UnRegistrationScreenStack from '@screens/UnRegistrationScreenStack';

function App(): React.JSX.Element {
	SplashScreen.hide();

	return <UnRegistrationScreenStack />;
}

export default App;
