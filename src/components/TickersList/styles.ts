import styled from 'styled-components/native';

import type { WrapperProps } from './types';

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

export const TickerDescriptionText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 24px;
`;
