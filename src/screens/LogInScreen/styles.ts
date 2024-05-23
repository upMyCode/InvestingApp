import styled from 'styled-components/native';
import colorPalette from '@theme/colors';
import { Platform } from 'react-native';

export const MainWrapper = styled.SafeAreaView`
	flex: 1;
	background-color: ${colorPalette.white};
`;

export const Wrapper = styled.ScrollView`
	background-color: ${colorPalette.white};
	display: flex;
	width: 100%;
	margin-top: ${Platform.OS === 'ios' ? '0' : '50'}px;
`;

export const Description = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 32px;
	margin-top: 20px;
	text-align: center;
`;

export const ImageWrapper = styled.View`
	align-items: center;
	margin-top: 20px;
`;

export const ImageView = styled.Image`
	margin-top: ${Platform.OS === 'ios' ? '0' : '20'}px;
`;
