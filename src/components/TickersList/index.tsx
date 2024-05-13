import { View, Text, FlatList } from 'react-native';
import React from 'react';
import TickersItem from '@components/TickersItem';
import Button from '@components/Button';
import { Wrapper, Content, TickersHeader, TickerDescription, TickerDescriptionText } from './styles';
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
}: TickersListProps) => {
	const sortedByTickerType =
		searchCategories.searchType !== 'All' ? renderData?.filter((ticker) => ticker.type === searchCategories.searchType) : renderData;
	const sortedTickers =
		searchCategories.searchCategory !== 'All'
			? sortedByTickerType?.filter((ticker) => ticker.sector === searchCategories.searchCategory)
			: sortedByTickerType;
	const renderTickerItem = ({ item }: ListRenderItemInfo<Stocks>) => {
		const isSelected = item.symbol === selectedItem?.symbol;
		return isChooseableItems && handleSelectItem ? (
			<Button
				width='100%'
				height={54}
				mt={5}
				bColor='none'
				bgColor={isSelected ? '#735b2d' : 'transparent'}
				onPress={() => handleSelectItem(item)}
				bRadius={10}
			>
				<TickersItem industry={item.industry} symbol={item.symbol} image={item.image} price={item.price} isSelected={isSelected} />
			</Button>
		) : (
			<TickersItem industry={item.industry} symbol={item.symbol} image={item.image} price={item.price} />
		);
	};
	return (
		<Wrapper>
			<TickersHeader>
				<TickerDescription>
					<TickerDescriptionText>{searchCategories.searchCategory}</TickerDescriptionText>
				</TickerDescription>
				<TickersDropDown handleSetSearchCategory={handleSetSearchCategory} />
			</TickersHeader>
			<Content maxHeightForList={maxHeightForList}>
				{renderData && (
					<FlatList keyExtractor={({ isin }) => (isin ? isin : '1')} data={sortedTickers} renderItem={renderTickerItem} />
				)}
			</Content>
		</Wrapper>
	);
};

export default TickersList;
