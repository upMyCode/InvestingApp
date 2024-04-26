import { tabBarImageItemDimensions } from '@constants/dimensions';
import { HomeLogoIMG, AnalyticLogoIMG, PortfolioLogoIMG, UserProfileLogoIMG, ChatLogoIMG } from '@helpers/imagesResolve';
import React from 'react';
import { Image } from 'react-native';

import { ActivityIndicator, Wrapper, ImageWrapper } from './styles';
import { Item } from './types';

export default function TabBarItem({ label, isFocused }: Item) {
	const { home, analytics, portfolio, chat, profile } = tabBarImageItemDimensions;
	const handleGetItemImage = (imageLabel: string) => {
		switch (imageLabel) {
			case 'HomeScreen':
				return (
					<ImageWrapper>
						<Image width={home.width} height={home.height} source={{ uri: HomeLogoIMG }} />
					</ImageWrapper>
				);
			case 'AnalyticsScreen':
				return (
					<ImageWrapper>
						<Image width={analytics.width} height={analytics.height} source={{ uri: AnalyticLogoIMG }} />
					</ImageWrapper>
				);
			case 'ChatScreen':
				return (
					<ImageWrapper>
						<Image
							width={chat.width}
							height={chat.height}
							source={{
								uri: ChatLogoIMG,
							}}
						/>
					</ImageWrapper>
				);
			case 'PortfolioScreen':
				return (
					<ImageWrapper>
						<Image
							width={portfolio.width}
							height={portfolio.height}
							source={{
								uri: PortfolioLogoIMG,
							}}
						/>
					</ImageWrapper>
				);
			case 'UserProfileScreen':
				return (
					<ImageWrapper>
						<Image
							width={profile.width}
							height={profile.height}
							source={{
								uri: UserProfileLogoIMG,
							}}
						/>
					</ImageWrapper>
				);
			default: {
				return null;
			}
		}
	};

	return (
		<Wrapper>
			{handleGetItemImage(label)}
			{isFocused && <ActivityIndicator />}
		</Wrapper>
	);
}
