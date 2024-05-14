import styled from 'styled-components/native';

import { PasswordComplicityItemProps } from './types';

export const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 21px;
`;

export const CustomInput = styled.TextInput`
	font-family: 'Inter-Regular';
	color: #ffffff;
	font-size: 14px;
	width: 245px;
	height: 38px;
	border: 0.5px solid rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding-left: 12px;
`;

export const FormImage = styled.Image`
	margin-right: 11px;
`;

export const InputErrorText = styled.Text`
	font-family: 'Inter-Regular';
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
