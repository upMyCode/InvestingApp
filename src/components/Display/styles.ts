import styled from 'styled-components/native';
import { defaultDisplayTextColor, operatorDisplayTextColor } from '@theme/buttonTheme';

import type { ExpressionProps, ResultProps } from './types';

const Wrapper = styled.View`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	min-height: 241px;
	padding-top: 69px;
`;

const Expression = styled.Text<ExpressionProps>`
	color: ${({ type }) => {
		return type === 'operator' ? operatorDisplayTextColor : defaultDisplayTextColor;
	}};
	font-family: 'Inter-Medium';
	line-height: 36px;
	font-size: 24px;
`;
const MathExpression = styled.Text`
	margin-right: 60px;
`;
const Result = styled.Text<ResultProps>`
	font-family: 'Inter-Regular';
	line-height: 72px;
	font-size: 48px;
	margin-right: 33px;
	color: ${({ theme }) => {
		return theme === 'light' ? '#9D7830' : '#FFFFFF';
	}};
`;

export const ResultWrapper = styled.Text`
	display: flex;
	margin-right: 52px;
`;

export const ResultOperator = styled.Text<ResultProps>`
	font-family: 'Inter-Regular';
	line-height: 72px;
	font-size: 48px;
	margin-right: 33px;
	color: ${({ theme }) => {
		return theme === 'light' ? '#363534' : '#FFFFFF';
	}};
`;

export { Expression, MathExpression, Result, Wrapper };
