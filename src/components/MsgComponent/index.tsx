// import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TimeDelivery from '@components/TimeDelivery';

const MsgComponent = (props) => {
	const { sender, item, sendTime } = props;

	console.log('item', item.message);
	return (
		<Pressable style={{ marginVertical: 0 }}>
			<View style={[styles.TriangleShapeCSS, sender ? styles.right : [styles.left]]} />
			<View
				style={[
					styles.masBox,
					{
						alignSelf: sender ? 'flex-end' : 'flex-start',
						// borderWidth:1,
						backgroundColor: sender ? '#555452' : '#363534',
					},
				]}
			>
				<Text style={{ paddingLeft: 5, color: '#ffffff', fontFamily: 'Inter-Medium', fontSize: 12.5 }}>{item.message}</Text>

				<TimeDelivery sender={sender} item={item} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	masBox: {
		justifyContent: 'center',
		alignSelf: 'flex-end',
		marginHorizontal: 10,
		minWidth: '50%',
		height: 60,
		maxWidth: '80%',
		paddingHorizontal: 10,
		marginVertical: 5,
		paddingTop: 5,
		borderRadius: 8,
	},
	timeText: {
		fontFamily: 'Inter-Medium',
		fontSize: 10,
	},
	dayview: {
		alignSelf: 'center',
		height: 30,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: COLORS.white,
		borderRadius: 30,
		marginTop: 10,
	},
	iconView: {
		width: 42,
		height: 42,
		borderRadius: 21,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: COLORS.themecolor,
	},
	TriangleShapeCSS: {
		position: 'absolute',
		// top: -3,
		width: 0,
		height: 0,
		// borderBottomLeftRadius:5,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 15,
		borderRightWidth: 5,
		borderBottomWidth: 20,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		// borderBottomColor: '#757474'
	},
	left: {
		borderBottomColor: '#555452',
		left: 2,
		bottom: 10,
		transform: [{ rotate: '0deg' }],
	},
	right: {
		borderBottomColor: '#363534',
		right: 2,
		// top:0,
		bottom: 5,
		transform: [{ rotate: '103deg' }],
	},
});

export default MsgComponent;
