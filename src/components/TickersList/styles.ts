import styled from 'styled-components/native';

import type { WrapperProps, TickerDescriptionTextProps } from './types';

export const Wrapper = styled.View`
	width: 90%;
`;

export const Content = styled.View<WrapperProps>`
	width: 100%;
	height: ${({ maxHeightForList }) => maxHeightForList}px;
`;

export const TickersHeader = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	height: 34px;
	margin: 8px 0 19px 0;
`;

export const TickerDescription = styled.View`
	flex-direction: row;
	align-items: flex-start;
`;

export const TickerDescriptionText = styled.Text<TickerDescriptionTextProps>`
	font-family: 'Inter-Medium';
	font-size: 24px;
	color: ${({ isModal }) => (!isModal ? '#000000' : '#FFFFFF')};
`;

export const RenderNullListText = styled.Text`
	color: #c44e0c;
	font-family: 'Inter-Medium';
	text-align: center;
	font-size: 16px;
	margin-top: 50px;
`;
