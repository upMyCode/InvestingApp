import { StyleSheet } from 'react-native';

const BG_COLOR = '#9D7830';

const inlineStyle = StyleSheet.create({
	disabledRedirectionBar: {
		backgroundColor: BG_COLOR,
		border: 0,
		margin: 0,
		padding: 0,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 0,
		paddingBottom: 30,
	},
	tabStyle: {
		backgroundColor: BG_COLOR,
	},
});

export default inlineStyle;
