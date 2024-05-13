import React from 'react';
import {
	Wrapper,
	Content,
	ContentHeaderWrapper,
	PortfolioTitle,
	ButtonText,
	PortfolioBalanceContainer,
	PortfolioBalanceText,
	PortfolioFooterContainer,
	PortfolioFooterLine,
} from './styles';
import Button from '@components/Button';

import type { PortfolioCardProps } from './types';

const PortfolioCard = ({ typePortfolioCard }: PortfolioCardProps) => {
	const balance = 0;
	return (
		<Wrapper>
			<Content>
				<ContentHeaderWrapper>
					<PortfolioTitle>{typePortfolioCard === 'balance' ? 'User balance' : 'Portfolio balance'}</PortfolioTitle>
					<Button width={79} height={31} bgColor='#C44E0C' onPress={() => {}} bRadius={10}>
						<ButtonText>{typePortfolioCard === 'balance' ? 'Top Up' : '<- Balance'}</ButtonText>
					</Button>
				</ContentHeaderWrapper>
				<PortfolioBalanceContainer>
					<PortfolioBalanceText>{`$${balance}`}</PortfolioBalanceText>
				</PortfolioBalanceContainer>
				<PortfolioFooterContainer>
					<PortfolioFooterLine />
				</PortfolioFooterContainer>
			</Content>
		</Wrapper>
	);
};

export default PortfolioCard;
