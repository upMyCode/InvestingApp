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
import { ArrowDownLogoIMG } from '@helpers/imagesResolve';
import Button from '@components/Button';
import { Image } from 'react-native';

import type { PortfolioCardProps } from './types';

const PortfolioCard = ({ typePortfolioCard, balance = 0, cardHandler }: PortfolioCardProps) => {
	return (
		<Wrapper>
			<Content>
				<ContentHeaderWrapper>
					<PortfolioTitle>{typePortfolioCard === 'user balance' ? 'User balance' : 'Portfolio balance'}</PortfolioTitle>
					<Button width={84} height={32} bgColor='#C44E0C' onPress={cardHandler} bRadius={10}>
						<ButtonText>{typePortfolioCard === 'user balance' ? 'Top Up' : '<- Balance'}</ButtonText>
					</Button>
				</ContentHeaderWrapper>
				<PortfolioBalanceContainer>
					<PortfolioBalanceText>{`$${balance}`}</PortfolioBalanceText>
				</PortfolioBalanceContainer>
				<PortfolioFooterContainer>
					{typePortfolioCard === 'user balance' ? (
						<PortfolioFooterLine />
					) : (
						<Button width={50} height={50} bRadius={50} bgColor='#C44E0C' onPress={() => {}}>
							<Image source={{ uri: ArrowDownLogoIMG }} width={24} height={24} />
						</Button>
					)}
				</PortfolioFooterContainer>
			</Content>
		</Wrapper>
	);
};

export default PortfolioCard;
