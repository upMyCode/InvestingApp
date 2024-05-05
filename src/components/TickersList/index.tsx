import { View, Text, FlatList } from 'react-native';
import React from 'react';
import TickersItem from '@components/TickersItem';
import { Wrapper, Content, TickersHeader, TickerDescription, TickerDescriptionText } from './styles';

import type { TickersListProps } from './types';
import type { ListRenderItemInfo } from 'react-native';
import type { Stocks } from '@constants/stocks/types';

const TickersList = ({ renderData, searchCategories, maxHeightForList }: TickersListProps) => {
	const sortedByTickerType =
		searchCategories.searchType !== 'All' ? renderData?.filter((ticker) => ticker.type === searchCategories.searchType) : renderData;
	const renderTickerItem = ({ item }: ListRenderItemInfo<Stocks>) => {
		return <TickersItem industry={item.industry} symbol={item.symbol} image={item.image} price={item.price} />;
	};
	return (
		<Wrapper>
			<TickersHeader>
				<TickerDescription>
					<TickerDescriptionText>{searchCategories.searchCategory}</TickerDescriptionText>
				</TickerDescription>
			</TickersHeader>
			<Content maxHeightForList={maxHeightForList}>
				{renderData && (
					<FlatList keyExtractor={({ isin }) => (isin ? isin : '1')} data={sortedByTickerType} renderItem={renderTickerItem} />
				)}
			</Content>
		</Wrapper>
	);
};

export default TickersList;
