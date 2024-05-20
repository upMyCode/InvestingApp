import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import { PasswordComplicityItemProps } from './types';

export const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 21px;
`;

export const FormImage = styled.Image`
	margin-right: 11px;
`;

export const InputErrorText = styled.Text`
	font-family: 'Inter-Medium';
	color: #ed051c;
	line-height: 21px;
	font-size: 14px;
	max-width: 210px;
`;

export const FormContainer = styled.View`
	display: flex;
`;

export const PasswordComplicityContainer = styled.View`
	display: flex;
	flex-direction: row;
	width: 100px;
	height: 10px;
`;

export const PasswordComplicityItem = styled.View<PasswordComplicityItemProps>`
	width: 25px;
	margin-top: 4px;
	border-radius: 10px;
	margin-right: 2px;
	height: 10px;
	background-color: ${({ bgColor }) => {
		return bgColor;
	}};
`;

export const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: 245,
		height: 38,
		borderWidth: 0.5,
		borderColor: '#FFFFFF',
		backgroundColor: '#363534',
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#FFFFFF',
		fontFamily: 'Inter-Regular',
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: '#363534',
		borderRadius: 10,
		borderColor: '#FFFFFF',
	},
	dropdownItemStyle: {
		width: 245,
		height: 38,
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
		backgroundColor: '#363534',
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#FFFFFF',
		fontFamily: 'Inter-Regular',
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
});

export const InputTitle = styled.Text`
	font-family: 'Inter-Regular';
	color: #ffffff;
	margin-bottom: 1px;
`;

export const InputTitleAsterix = styled.Text`
	font-family: 'Inter-Regular';
	color: #ff0808;
	margin-left: 2px;
`;
