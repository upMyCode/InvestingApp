import React from 'react';
import { Image } from 'react-native';
import Button from '@components/Button';
import { Wrapper, Text, Content, ButtonsList } from './styles';
import { AdminLogoIMG, AnalyticsNavigationLogoIMG } from '@helpers/imagesResolve';

import type { HomeHeaderProps } from './types';

const HomeHeader = ({ title, handlerForNavigateToAdminPanel, isAdmin, handleNavigateToAnalytics }: HomeHeaderProps) => {
	return (
		<Wrapper>
			<Content>
				<Text>{title}</Text>
				<ButtonsList>
					{isAdmin && (
						<Button width={24} height={24} bgColor='transparent' onPress={handlerForNavigateToAdminPanel}>
							<Image source={{ uri: AdminLogoIMG }} width={24} height={24} />
						</Button>
					)}
					<Button width={24} height={24} bgColor='transparent' onPress={handleNavigateToAnalytics}>
						<Image source={{ uri: AnalyticsNavigationLogoIMG }} width={24} height={24} />
					</Button>
				</ButtonsList>
			</Content>
		</Wrapper>
	);
};

export default HomeHeader;
