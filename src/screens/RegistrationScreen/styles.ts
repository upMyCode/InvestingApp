import styled from 'styled-components/native';
import colorPalette from '@theme/colors';

export const MainWrapper = styled.SafeAreaView`
	flex: 1;
	background-color: ${colorPalette.white};
`;

export const Wrapper = styled.ScrollView`
	background-color: ${colorPalette.white};
	display: flex;
	width: 100%;
`;

export const Description = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 32px;
	margin-top: 79px;
	text-align: center;
`;

export const ImageWrapper = styled.View`
	align-items: center;
	margin-top: 20px;
`;
