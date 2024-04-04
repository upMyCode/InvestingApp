import styled from 'styled-components/native';

import { PasswordComplicityItemProps } from './types';

export const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 21px;
`;

export const CustomInput = styled.TextInput`
	font-family: 'Inter-Medium';
	color: rgba(143, 114, 58, 0.95);
	line-height: 21px;
	font-size: 14px;
	width: 297px;
	height: 56px;
	border: 1px solid rgba(143, 114, 58, 0.95);
	border-radius: 10px;
	padding-bottom: 6px;
	padding-left: 12px;
`;

export const FormImage = styled.Image`
	margin-right: 11px;
`;

export const InputErrorText = styled.Text`
	font-family: 'Inter-Medium';
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
