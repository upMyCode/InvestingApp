import styled from 'styled-components/native';

import type { PaintedButtonProps } from './types';

const PaintedButton = styled.TouchableHighlight<PaintedButtonProps>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ width }) => {
		return typeof width === 'string' ? `${width}%` : `${width || 0}px`;
	}};
	height: ${({ height }) => {
		return height || 0;
	}}px;
	background-color: ${({ bgColor }) => {
		return bgColor;
	}};
	border-radius: ${({ bRadius }) => {
		return bRadius ? (typeof bRadius === 'number' ? `${bRadius}px` : bRadius) : `${0}px`;
	}};
	border: ${({ bColor }) => {
		return bColor || 'none';
	}};
	box-shadow: ${({ boxShadow }) => {
		return boxShadow ? '0px 4px rgba(0, 0, 0, 0.25)' : '1px 1px rgba(0, 0, 0, 0)';
	}};
	margin-top: ${({ mt }) => {
		return mt || 0;
	}}px;
	margin-left: ${({ ml }) => {
		return ml || 0;
	}}px;
	elevation: 25;
`;
export default PaintedButton;
