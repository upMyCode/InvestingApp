import styled from 'styled-components/native';
import colorPalette from '@theme/colors';

export const MainWrapper = styled.SafeAreaView`
	flex: 1;
	background-color: #ffffff;
`;

export const Wrapper = styled.View`
	background-color: #ffffff;
	display: flex;
	align-items: center;
	width: 100%;
`;

export const Description = styled.Text`
	font-size: 16px;
	color: ${colorPalette.textGold};
	font-family: 'Inter-Medium';
	text-align: center;
	width: 314px;
	margin-top: 105px;
`;

export const ButtonText = styled.Text`
	font-size: 15px;
	color: ${colorPalette.textGold};
	font-family: 'Inter-Medium';
`;
