import { KEY_CUPS_BLOCK_9, KEY_CUPS_BLOCK_10 } from '@constants/keyCups/keyCups';
import { themeColorButtons } from '@theme/buttonTheme';
import React from 'react';
import { View } from 'react-native';
import KeypadItem from '@components/KeypadItem';

import Wrapper from './styles';
import type KeypadContainerTopProps from './types';

function ContainerMiddleBottom({ handleSetMathExpression }: KeypadContainerTopProps): JSX.Element {
	const { bgColorKeyCupsBlock9, textColorKeyCupsBlock9, bgColorKeyCupsBlock10, textColorKeyCupsBlock10 } = themeColorButtons;
	return (
		<Wrapper>
			<View>
				<KeypadItem
					data={KEY_CUPS_BLOCK_9}
					numCol={1}
					handleSetMathExpression={handleSetMathExpression}
					bgColor={bgColorKeyCupsBlock9}
					textColor={textColorKeyCupsBlock9}
					radius='16'
					width='144'
					height='60'
					size='32'
					type='BASE'
				/>
			</View>
			<View>
				<KeypadItem
					data={KEY_CUPS_BLOCK_10}
					numCol={1}
					handleSetMathExpression={handleSetMathExpression}
					bgColor={bgColorKeyCupsBlock10}
					textColor={textColorKeyCupsBlock10}
					radius='16'
					width='62'
					height='62'
					size='32'
					type='BASE'
				/>
			</View>
		</Wrapper>
	);
}

export default ContainerMiddleBottom;
