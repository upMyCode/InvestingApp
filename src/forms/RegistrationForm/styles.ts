import styled from 'styled-components/native';
import colorPalette from '@theme/colors';

export const RegistrationText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 14px;
	line-height: 21px;
	color: #ffffff;
`;

export const RegistrationButtonContainer = styled.View`
	display: flex;
	align-items: center;
	margin-bottom: 18px;
`;

export const FormWrapper = styled.View`
	align-items: center;
`;

export const RegistrationErrorText = styled.Text`
	margin-top: 2px;
	font-family: 'Inter-Medium';
	color: #ed051c;
	line-height: 21px;
	font-size: 14px;
	max-width: 210px;
`;

export const ButtonText = styled.Text`
	font-size: 15px;
	color: ${colorPalette.textGold};
	font-family: 'Inter-Medium';
`;

export const FormDescription = styled.Text`
	margin-top: 2px;
	font-family: 'Inter-Medium';
	color: grey;
	line-height: 21px;
	font-size: 14px;
	max-width: 210px;
`;

export const FormDescriptionLink = styled.Text`
	margin-top: 2px;
	font-family: 'Inter-MediumItalic';
	font-style: italic;
	color: ${colorPalette.textGold};
	line-height: 21px;
	font-size: 14px;
	max-width: 210px;
`;

export const FormDescriptionWrapper = styled.Text`
	width: 300px;
	margin-top: 10px;
`;
