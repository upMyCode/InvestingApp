import { Image } from 'react-native';
import { Wrapper, Content, ContentTitle } from './styles';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/core';
import PortfolioCard from '@components/PortfolioCard';
import Button from '@components/Button';
import { PortfolioLogoIMG } from '@helpers/imagesResolve';
import { useState } from 'react';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';

const PortfolioScreen = () => {
	const [typePortfolioCard, setTypePortfolioCard] = useState<string>('balance');
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();

	const handleNavigateToBackScreen = () => {
		navigation.goBack();
	};
	return (
		<Wrapper>
			<Header title='Portfolio' handlerForReturnToPage={handleNavigateToBackScreen} />
			<PortfolioCard typePortfolioCard={typePortfolioCard} />
			<Content>
				<ContentTitle>{typePortfolioCard === 'balance' ? 'Create your portfolio' : 'Choose your stock'}</ContentTitle>
				<Button width={90} height={90} bgColor='#383838' onPress={() => {}} bRadius={90} mt={33}>
					<Image source={{ uri: PortfolioLogoIMG }} width={23} height={20} />
				</Button>
			</Content>
		</Wrapper>
	);
};

export default PortfolioScreen;
