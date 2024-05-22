import styled from 'styled-components/native';

import type { ContentProps, HeaderTextProps } from './types';

export const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const Content = styled.View<ContentProps>`
	display: flex;
	background-color: #2e2e2e;
	border-radius: 15px;
	width: ${({ width }) => {
		return width;
	}}px;
`;

export const ContentHeader = styled.View`
	margin: 15px 17px 20px 25px;
	height: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const HeaderText = styled.Text<HeaderTextProps>`
	font-family: 'Inter-Medium';
	color: #dbdbdb;
	font-size: ${({ fSize }) => {
		return fSize;
	}}px;
	line-height: ${({ fLineHeight }) => {
		return fLineHeight ? `${fLineHeight}px` : '20px';
	}};
	z-index: 10000;
`;

export const ContentMain = styled.View`
	display: flex;
`;

export const HeaderButtonContainer = styled.View`
	position: relative;
`;
