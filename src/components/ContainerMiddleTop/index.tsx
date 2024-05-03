import { KEY_CUPS_BLOCK_2, KEY_CUPS_BLOCK_3, KEY_CUPS_BLOCK_4 } from '@constants/keyCups/keyCups';
import { themeColorButtons } from '@theme/buttonTheme';
import React from 'react';
import KeypadItem from '@components/KeypadItem';
import Wrapper from './styles';
import type KeypadContainerTopProps from './types';

function ContainerMiddleTop({ handleSetMathExpression }: KeypadContainerTopProps): JSX.Element {
	const {
		bgColorKeyCupsBlock2,
		textColorKeyCupsBlock2,
		bgColorKeyCupsBlock3,
		textColorKeyCupsBlock3,
		bgColorKeyCupsBlock4,
		textColorKeyCupsBlock4,
	} = themeColorButtons;
	return (
		<Wrapper>
			<KeypadItem
				data={KEY_CUPS_BLOCK_2}
				numCol={1}
				handleSetMathExpression={handleSetMathExpression}
				bgColor={bgColorKeyCupsBlock2}
				textColor={textColorKeyCupsBlock2}
				radius='16'
				width='62'
				height='62'
				size='32'
				type='BASE'
			/>
			<KeypadItem
				data={KEY_CUPS_BLOCK_3}
				numCol={1}
				handleSetMathExpression={handleSetMathExpression}
				bgColor={bgColorKeyCupsBlock3}
				textColor={textColorKeyCupsBlock3}
				radius='16'
				width='62'
				height='62'
				size='32'
				type='BASE'
			/>
			<KeypadItem
				data={KEY_CUPS_BLOCK_4}
				numCol={1}
				handleSetMathExpression={handleSetMathExpression}
				bgColor={bgColorKeyCupsBlock4}
				textColor={textColorKeyCupsBlock4}
				radius='16'
				width='62'
				height='62'
				size='32'
				type='BASE'
			/>
		</Wrapper>
	);
}

export default ContainerMiddleTop;
