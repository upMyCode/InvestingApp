import { KEY_CUPS_BLOCK_5 } from '@constants/keyCups/keyCups';
import React from 'react';
import KeypadItem from '@components/KeypadItem';
import { themeColorButtons } from '@theme/buttonTheme';
import Wrapper from './styles';
import type KeypadContainerTopProps from './types';

function ContainerMiddleTop({ handleSetMathExpression }: KeypadContainerTopProps): JSX.Element {
	const { bgColorKeyCupsBlock5, textColorKeyCupsBlock5 } = themeColorButtons;
	return (
		<Wrapper>
			<KeypadItem
				data={KEY_CUPS_BLOCK_5}
				numCol={3}
				handleSetMathExpression={handleSetMathExpression}
				bgColor={bgColorKeyCupsBlock5}
				textColor={textColorKeyCupsBlock5}
				radius='16'
				width='62'
				height='62'
				size='32'
				type='NUM'
			/>
		</Wrapper>
	);
}

export default ContainerMiddleTop;
