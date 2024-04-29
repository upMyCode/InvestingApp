import React from 'react';
import { View } from 'react-native';
import ContainerAside from '@components/ContainerAside';
import ContainerMiddleBottom from '@components/ContainerMiddleBottom';
import ContainerMiddleCenter from '@components/ContainerMiddleCenter';
import ContainerMiddleTop from '@components/ContainerMiddleTop';
import ContainerTop from '@components/ContainerTop';

import { KeyCupContainer, Wrapper } from './styles';
import type KeypadProps from './types';

function Keypad({ handleSetMathExpression }: KeypadProps): JSX.Element {
	return (
		<Wrapper>
			<ContainerTop handleSetMathExpression={handleSetMathExpression} />
			<KeyCupContainer>
				<View>
					<ContainerMiddleTop handleSetMathExpression={handleSetMathExpression} />
					<ContainerMiddleCenter handleSetMathExpression={handleSetMathExpression} />
					<ContainerMiddleBottom handleSetMathExpression={handleSetMathExpression} />
				</View>
				<ContainerAside handleSetMathExpression={handleSetMathExpression} />
			</KeyCupContainer>
		</Wrapper>
	);
}

export default Keypad;
