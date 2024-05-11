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
} from './styles';
import { sliceDescription } from '@helpers/sliceDescription';

import type { TickersItemProps } from './types';

const TickersItem = ({ industry, symbol, image, price }: TickersItemProps) => {
	const priceInfo = `${price}$`;
	return (
		<Wrapper>
			<TickerInfo>
				<TickersImageWrapper>
					<Image source={{ uri: image }} width={24} height={24} />
				</TickersImageWrapper>
				<TickersDescriptionWrapper>
					<TickersTitle>{symbol}</TickersTitle>
					<TickersDescription>{sliceDescription(industry)}</TickersDescription>
				</TickersDescriptionWrapper>
			</TickerInfo>
			<PriceWrapper>
				<PriceText>{priceInfo}</PriceText>
			</PriceWrapper>
		</Wrapper>
	);
};

export default TickersItem;
