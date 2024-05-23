import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const BG_COLOR = '#9D7830';

const padding =
	Platform.OS === 'ios'
		? {
				paddingBottom: 25,
				height: 70,
		  }
		: {
				padding: 20,
				height: 10,
		  };

const inlineStyle = StyleSheet.create({
	disabledRedirectionBar: {
		backgroundColor: BG_COLOR,
		border: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 0,
		...padding,
	},
	tabStyle: {
		backgroundColor: BG_COLOR,
	},
});

export default inlineStyle;
