import { View, Text, FlatList } from 'react-native';
import React from 'react';
import TickersItem from '@components/TickersItem';
import Button from '@components/Button';
import { Wrapper, Content, TickersHeader, TickerDescription, TickerDescriptionText, RenderNullListText } from './styles';
import TickersDropDown from '@components/TickersDropDown';

import type { TickersListProps } from './types';
import type { ListRenderItemInfo } from 'react-native';
import type { Stocks } from '@constants/stocks/types';

const TickersList = ({
	renderData,
	searchCategories,
	maxHeightForList,
	handleSetSearchCategory,
	isChooseableItems,
	handleSelectItem,
	selectedItem,
	tickersItemHeight,
	tickersListSearchButtonPosition,
	isModal,
}: TickersListProps) => {
	const sortedByTickerType =
		searchCategories.searchType !== 'All' ? renderData?.filter((ticker) => ticker.type === searchCategories.searchType) : renderData;
	const sortedTickers =
		searchCategories.searchCategory !== 'All'
			? sortedByTickerType?.filter((ticker) => ticker.sector === searchCategories.searchCategory)
			: sortedByTickerType;

	const renderTickerItem = ({ item }: ListRenderItemInfo<Stocks>) => {
		const isSelected = item.symbol === selectedItem?.symbol;

		if (isChooseableItems && handleSelectItem) {
			return (
				<Button
					width='100%'
					height={54}
					mt={5}
					bColor='none'
					bgColor={isSelected ? '#735b2d' : 'transparent'}
					onPress={() => handleSelectItem(item)}
					bRadius={10}
				>
					<TickersItem
						industry={item.industry}
						symbol={item.symbol}
						image={item.image}
						price={item.price}
						isSelected={isSelected}
						tickersItemHeight={tickersItemHeight}
						value={item.value}
						changes={item.changes}
					/>
				</Button>
			);
		}

		return (
			<TickersItem
				industry={item.industry}
				symbol={item.symbol}
				image={item.image}
				price={item.price}
				value={item.value}
				changes={item.changes}
			/>
		);
	};
	return (
		<Wrapper>
			<TickersHeader>
				<TickerDescription>
					<TickerDescriptionText isModal={isModal}>{searchCategories.searchCategory}</TickerDescriptionText>
				</TickerDescription>
				<TickersDropDown
					handleSetSearchCategory={handleSetSearchCategory}
					tickersListSearchButtonPosition={tickersListSearchButtonPosition}
				/>
			</TickersHeader>
			<Content maxHeightForList={maxHeightForList}>
				{sortedTickers && (
					<FlatList keyExtractor={({ isin }) => (isin ? isin : '1')} data={sortedTickers} renderItem={renderTickerItem} />
				)}
				{!renderData && <RenderNullListText>Stocks list now is empty</RenderNullListText>}
			</Content>
		</Wrapper>
	);
};

export default TickersList;
