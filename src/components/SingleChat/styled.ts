import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const screenHeight = Dimensions.get('screen').height - Dimensions.get('screen').height * 0.4;

export const Input = styled.TextInput`
	background-color: #363534;
	width: 80%;
	height: 56;
	padding: 16px 0 0 20px;
	border-radius: 10px;
	border-width: 1px;
	border-color: #363534;
	color: #ffffff;
`;

export const MessagesWrapper = styled.ScrollView`
	width: 100%;
	height: ${screenHeight}px;
`;

export const Wrapper = styled.View`
	width: 100%;
`;
