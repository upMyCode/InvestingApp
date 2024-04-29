import React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import Button from '@components/Button';
import type { KEYCUP } from '@constants/keyCups/types';

import {
	KeyCupListItem,
	KeyCupListItemNumbers,
	KeyCupListItemRightSideFirstGroup,
	KeyCupListItemRightSideSecondGroup,
	KeyCupText,
} from './styles';
import type KeypadItemProps from './types';

function KeypadItem({
	data,
	numCol,
	handleSetMathExpression,
	bgColor,
	textColor,
	radius,
	width,
	height,
	type,
}: KeypadItemProps): JSX.Element {
	const handleRenderItem = ({ item }: ListRenderItemInfo<KEYCUP>) => {
		const Wrapper =
			type === 'NUM'
				? KeyCupListItemNumbers
				: type === 'FIRSTGROUP'
				? KeyCupListItemRightSideFirstGroup
				: type === 'SECONDGROUP'
				? KeyCupListItemRightSideSecondGroup
				: KeyCupListItem;

		return (
			<Wrapper>
				<Button
					onPress={() => {
						return handleSetMathExpression(item.title);
					}}
					bgColor={bgColor}
					bRadius={+radius}
					width={+width}
					height={+height}
				>
					<KeyCupText color={textColor}>{item.title}</KeyCupText>
				</Button>
			</Wrapper>
		);
	};
	return (
		<FlatList
			data={data}
			scrollEnabled={false}
			numColumns={numCol}
			keyExtractor={({ id }) => {
				return id;
			}}
			renderItem={handleRenderItem}
		/>
	);
}

export default KeypadItem;
