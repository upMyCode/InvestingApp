import { KEY_CUPS_BLOCK_1 } from '@constants/keyCups/keyCups';
import { themeColorButtons } from '@theme/buttonTheme';
import React from 'react';
import KeypadItem from '@components/KeypadItem';

import Wrapper from './styles';
import type KeypadContainerTopProps from './types';

function ContainerTop({ handleSetMathExpression }: KeypadContainerTopProps): JSX.Element {
	const { bgColorKeyCupsBlock1, textColorKeyCupsBlock1 } = themeColorButtons;
	return (
		<Wrapper>
			<KeypadItem
				data={KEY_CUPS_BLOCK_1}
				numCol={4}
				type='BASE'
				handleSetMathExpression={handleSetMathExpression}
				bgColor={bgColorKeyCupsBlock1}
				textColor={textColorKeyCupsBlock1}
				radius='12'
				width='62'
				height='40'
				size='18'
			/>
		</Wrapper>
	);
}

export default ContainerTop;
