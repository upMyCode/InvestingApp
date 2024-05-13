import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Wrapper = styled.ScrollView`
	width: 90%;
	position: relative;
`;

export const StockTypeText = styled.Text`
	position: absolute;
	left: 20px;
	top: 22px;
	color: #9d7830;
	z-index: 1000;
	font-family: 'Inter-Medium';
	font-size: 13px;
`;

export const DateDiagramButtonsPickerWrapper = styled.View`
	width: 66px;
	position: absolute;
	z-index: 1000;
	left: 265px;
	top: 22px;
`;

export const SearchDateButtonText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 8px;
	color: #ebc67e;
`;

export const SearchDateButtonWrapper = styled.View`
	width: 32px;
	height: 17px;
	shadow-color: '#171717',
    shadow-Offset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
`;

export const styles = StyleSheet.create({
	shadowProp: {
		width: 33,
		height: 20,
		shadowColor: '#171717',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 3,
	},
});
