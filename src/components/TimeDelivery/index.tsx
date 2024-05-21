import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeDelivery = (props) => {
	const { sender, item } = props;
	return (
		<View
			style={[
				styles.mainView,
				{
					justifyContent: 'flex-end',
					marginTop: 15,
				},
			]}
		>
			<Text
				style={{
					fontFamily: 'Inter-Medium',
					fontSize: 10,
					color: '#FFFFFF',
				}}
			>
				{moment(item.send_time).format('LLL')}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

//make this component available to the app
export default TimeDelivery;
