/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { nameAndroid, nameIOS } from './app.json';
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
	AppRegistry.registerComponent(nameAndroid, () => App);
} else {
	AppRegistry.registerComponent(nameIOS, () => App);
}
