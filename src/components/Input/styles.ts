import styled from 'styled-components/native';

import { PasswordComplicityItemProps } from './types';

export const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 21px;
`;

export const CustomInput = styled.TextInput`
	font-family: 'Poppins-Light';
	color: #ffffff;
	line-height: 21px;
	font-size: 14px;
	width: 200px;
	border-bottom-width: 1px;
	border-bottom-color: #d9d9d9;
	padding-bottom: 6px;
`;

export const FormImage = styled.Image`
	margin-right: 11px;
`;

export const InputErrorText = styled.Text`
	font-family: 'Poppins-Regular';
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
