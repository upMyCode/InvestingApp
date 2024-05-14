import { Image } from 'react-native';
import { Wrapper, Content, ContentTitle, StockListWrapper } from './styles';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/core';
import PortfolioCard from '@components/PortfolioCard';
import Button from '@components/Button';
import TopUpForm from '@forms/TopUpForm';
import ModalContainer from '@components/ModalContainer';
import { PortfolioLogoIMG } from '@helpers/imagesResolve';
import { useAppSelector } from '@store/hooks';
import TickersList from '@components/TickersList';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { handleGetAllStocks } from '@api/stocks/stocksHelpers';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { Stocks } from '@constants/stocks/types';

interface SearchCategories {
	searchType: string;
	searchCategory: string;
}

const PortfolioScreen = () => {
	const [typePortfolioCard, setTypePortfolioCard] = useState<string>('user balance');
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const balance = useAppSelector((store) => store.createUserSlice.user.balance);
	const [sortCategories, setSortCategories] = useState<SearchCategories>({
		searchType: 'All',
		searchCategory: 'All',
	});
	const screenWidth = Dimensions.get('screen').width;
	const screenHeight = Dimensions.get('screen').width;
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const [stocks, setStocks] = useState<Stocks[] | null>([]);
	const [error, setError] = useState<string>('');

	const handleNavigateToBackScreen = () => {
		navigation.goBack();
	};

	const handleGoToPortfolioBalanceView = () => {
		setTypePortfolioCard('portfolio balance');
	};

	const handleGoToUserBalanceView = () => {
		setTypePortfolioCard('user balance');
	};

	const handleTopUp = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const handleSetSearchCategory = (category: string) => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchCategory: category,
			};
		});
	};

	useEffect(() => {
		const handleGetStocksDataFromDB = async () => {
			const response = await handleGetAllStocks();

			if (response && typeof response === 'string') {
				setError(response);
			} else if (response && typeof response !== 'string') {
				setStocks(response);
			}
		};

		handleGetStocksDataFromDB();
	}, []);

	const cardHandler = typePortfolioCard === 'portfolio balance' ? handleGoToUserBalanceView : handleTopUp;

	return (
		<Wrapper>
			<Header title='Portfolio' handlerForReturnToPage={handleNavigateToBackScreen} />
			<PortfolioCard typePortfolioCard={typePortfolioCard} balance={balance} cardHandler={cardHandler} />
			<Content>
				<ContentTitle>{typePortfolioCard === 'user balance' ? 'Create your portfolio' : 'Choose your stock'}</ContentTitle>
				{typePortfolioCard === 'user balance' ? (
					<Button width={90} height={90} bgColor='#383838' onPress={handleGoToPortfolioBalanceView} bRadius={90} mt={33}>
						<Image source={{ uri: PortfolioLogoIMG }} width={23} height={20} />
					</Button>
				) : (
					<StockListWrapper>
						<TickersList
							renderData={stocks}
							searchCategories={sortCategories}
							maxHeightForList={screenHeight >= 844 ? 360 : 250}
							handleSetSearchCategory={handleSetSearchCategory}
						/>
					</StockListWrapper>
				)}
			</Content>
			{isModalVisible && (
				<ModalContainer title='Top Up' width={313} handleModalOnClose={handleCloseModal} fSize={16} modalVisible={isModalVisible}>
					<TopUpForm />
				</ModalContainer>
			)}
		</Wrapper>
	);
};

export default PortfolioScreen;
