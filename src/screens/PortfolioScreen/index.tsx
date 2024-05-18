import { Image } from 'react-native';
import {
	Wrapper,
	Content,
	ContentTitle,
	StockListWrapper,
	UserPortfolioWrapper,
	UserPortfolioButtonWrapper,
	ButtonText,
	ButtonWrapper,
} from './styles';
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
import { ArrowTopLogoIMG } from '@helpers/imagesResolve';
import AddTransactionForm from '@forms/AddTransactionForm';

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
	const [modalName, setModalName] = useState<string>('top up');
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
		setModalName('top up');
	};

	const handleOpenUserPortfolio = () => {
		setModalVisible(true);
		setModalName('portfolio');
	};

	const handleOpenAddToPortfolioStock = () => {
		setModalVisible(true);
		setModalName('add stock');
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
	const tickersListSearchButtonPositionScreen = screenWidth - screenWidth * 0.25;
	const tickersListSearchButtonPositionModal = screenWidth - screenWidth * 0.3;

	return (
		<Wrapper>
			<Header title='Portfolio' handlerForReturnToPage={handleNavigateToBackScreen} />
			{(modalName === 'top up' || !isModalVisible) && (
				<PortfolioCard
					typePortfolioCard={typePortfolioCard}
					balance={balance}
					cardHandler={cardHandler}
					handleOpenUserPortfolio={handleOpenUserPortfolio}
				/>
			)}
			<Content>
				<ContentTitle>{typePortfolioCard === 'user balance' ? 'Create your portfolio' : 'Choose your stock'}</ContentTitle>
				{typePortfolioCard === 'user balance' ? (
					<Button width={90} height={90} bgColor='#383838' onPress={handleGoToPortfolioBalanceView} bRadius={90} mt={33}>
						<Image source={{ uri: PortfolioLogoIMG }} width={23} height={20} />
					</Button>
				) : (
					<StockListWrapper>
						<TickersList
							tickersListSearchButtonPosition={tickersListSearchButtonPositionScreen}
							renderData={stocks}
							searchCategories={sortCategories}
							maxHeightForList={screenHeight >= 844 ? 360 : 250}
							handleSetSearchCategory={handleSetSearchCategory}
						/>
					</StockListWrapper>
				)}
			</Content>
			{isModalVisible && modalName === 'top up' && (
				<ModalContainer title='Top Up' width={313} handleModalOnClose={handleCloseModal} fSize={16} modalVisible={isModalVisible}>
					<TopUpForm />
				</ModalContainer>
			)}
			{isModalVisible && modalName === 'portfolio' && (
				<ModalContainer
					title='Portfolio'
					width={363}
					handleModalOnClose={handleCloseModal}
					fSize={17}
					modalVisible={isModalVisible}
				>
					<UserPortfolioWrapper>
						<UserPortfolioButtonWrapper>
							<Button width={92} height={31} bgColor='#C44E0C' onPress={handleOpenAddToPortfolioStock} bRadius={10}>
								<ButtonText>Add stock</ButtonText>
							</Button>
						</UserPortfolioButtonWrapper>
						<StockListWrapper>
							<TickersList
								isModal
								tickersListSearchButtonPosition={tickersListSearchButtonPositionModal}
								renderData={null}
								searchCategories={sortCategories}
								tickersItemHeight={20}
								maxHeightForList={screenHeight >= 844 ? 360 : 450}
								handleSetSearchCategory={handleSetSearchCategory}
							/>
						</StockListWrapper>
						<ButtonWrapper>
							<Button width={50} height={50} bRadius={50} bgColor='#C44E0C' onPress={handleCloseModal}>
								<Image source={{ uri: ArrowTopLogoIMG }} width={24} height={24} />
							</Button>
						</ButtonWrapper>
					</UserPortfolioWrapper>
				</ModalContainer>
			)}
			{isModalVisible && modalName === 'add stock' && (
				<ModalContainer
					title='Add New Transaction'
					width={313}
					handleModalOnClose={handleCloseModal}
					fSize={16}
					modalVisible={isModalVisible}
				>
					<AddTransactionForm stocks={stocks} />
				</ModalContainer>
			)}
		</Wrapper>
	);
};

export default PortfolioScreen;
