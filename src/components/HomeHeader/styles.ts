import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Wrapper = styled.SafeAreaView`
	width: 100%;
	margin-top: ${Platform.OS === 'ios' ? '0' : '50'}px;
`;

export const Text = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 20px;
	line-height: 21px;
`;

export const Content = styled.View`
	width: 100%;
	padding: 0 23px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ButtonsList = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
