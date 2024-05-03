import React from 'react';
import uuid from 'react-native-uuid';

import { Expression, MathExpression, Result, Wrapper, ResultWrapper, ResultOperator } from './styles';
import type { DisplayProps } from './types';

function Display({ expression, result, handleLayout }: DisplayProps): JSX.Element {
	const reconstructionExpression = (currentExpression: string) => {
		const expressionItems = currentExpression.match(/([\d]+)|([+*-/%()]+)/g);

		return expressionItems?.map((elem) => {
			const KEY_ID = uuid.v4();

			if (/(\d+)/.test(elem)) {
				return (
					<Expression key={KEY_ID.toString()} type='default'>
						{elem}
					</Expression>
				);
			}
			return (
				<Expression key={KEY_ID.toString()} type='operator'>
					{elem}
				</Expression>
			);
		});
	};

	return (
		<Wrapper>
			<MathExpression testID='mathExpression' onLayout={handleLayout}>
				{reconstructionExpression(expression)}
			</MathExpression>
			{result && (
				<ResultWrapper>
					<ResultOperator theme='light'>=</ResultOperator>
					<Result testID='mathResult' theme='light'>{`${result}`}</Result>
				</ResultWrapper>
			)}
		</Wrapper>
	);
}

export default Display;
