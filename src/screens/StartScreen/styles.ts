import styled from 'styled-components/native';
import colorPalette from '@theme/colors';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
	alignPosition: {
		alignItems: 'center',
	},
});

export const MainWrapper = styled.SafeAreaView`
	flex: 1;
	background-color: ${colorPalette.white};
`;

export const ImageView = styled.Image`
	margin-top: ${Platform.OS === 'ios' ? '0' : '50'}px;
`;

export const Wrapper = styled.ScrollView`
	background-color: ${colorPalette.white};
	display: flex;
	width: 100%;
`;

export const ButtonWrapper = styled.View`
	display: flex;
	align-items: center;
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
