import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { TickersDropDownViewContainerProps } from './types';

export const TickersDropDownView = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	background-color: #9d7830;
	border-radius: 6px;
`;
export const TickersDropDownViewContainer = styled.View<TickersDropDownViewContainerProps>`
	position: relative;
	top: 18px;
	left: ${({ tickersListSearchButtonPosition }) => tickersListSearchButtonPosition}px;
`;
export const ButtonContainer = styled.View`
	display: flex;
	position: absolute;
	flex-direction: row;
	align-items: flex-end;
	flex: 1;
`;

export const RenderItemContainerText = styled.Text`
	padding: 10px;
`;

export const styles = StyleSheet.create({
	dropdownMenuStyle: {
		flex: 1,
		top: '50%',
		left: '25%',
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		width: 200,
		height: 220,
	},
	dropdownSearchInputStyle: {
		borderRadius: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EBC67E',
		width: 200,
		paddingHorizontal: 10,
	},
	dropdownItem: {
		width: 200,
		borderBottomWidth: 1,
		borderColor: '#EBC67E',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dropdownItemText: {
		padding: 5,
	},
});
