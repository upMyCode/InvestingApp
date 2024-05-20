import { View, Text, Image } from 'react-native';
import React from 'react';
import {
	Wrapper,
	TickerInfo,
	TickersImageWrapper,
	TickersDescriptionWrapper,
	TickersTitle,
	TickersDescription,
	PriceText,
	PriceWrapper,
	ValueWrapper,
	ValueText,
	DeltaWrapper,
	DeltaNegative,
	DeltaPositive,
} from './styles';
import { sliceDescription } from '@helpers/sliceDescription';

import type { TickersItemProps } from './types';

const TickersItem = ({ industry, symbol, image, price, isSelected, tickersItemHeight, value, changes }: TickersItemProps) => {
	const priceInfo = `${price}$`;
	const stockValueInfo = `Stock value:${value}`;
	const delta = `${changes}$`;
	return (
		<Wrapper isSelected={isSelected} tickersItemHeight={tickersItemHeight}>
			<TickerInfo>
				<TickersImageWrapper>
					<Image source={{ uri: image }} width={24} height={24} />
				</TickersImageWrapper>
				<TickersDescriptionWrapper>
					<TickersTitle>{symbol}</TickersTitle>
					<TickersDescription>{sliceDescription(industry)}</TickersDescription>
				</TickersDescriptionWrapper>
			</TickerInfo>
			<DeltaWrapper>{changes < 0 ? <DeltaNegative>{delta}</DeltaNegative> : <DeltaPositive>{delta}</DeltaPositive>}</DeltaWrapper>
			<PriceWrapper>
				<PriceText>{priceInfo}</PriceText>
				<ValueWrapper>
					<ValueText>{stockValueInfo}</ValueText>
				</ValueWrapper>
			</PriceWrapper>
		</Wrapper>
	);
};

export default TickersItem;
