import { FlatList, Dimensions, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { handleUploadStocks, handleGetAllStocks, getSellAndBuyUserTransactionsAPI } from '@api/stocks/stocksHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import HomeHeader from '@components/HomeHeader';
import { useAppSelector } from '@store/hooks';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { useGetButtonsForSearchStocksType } from '@hooks/useGetButtonsForSearchStocksType/useGetButtonsForSearchStocksType';
import {
	Wrapper,
	SearchTypesButtonsWrapper,
	SearchTypeText,
	MonthlyTickersInfoWrapper,
	MonthlyTickersInfoItemWrapper,
	MonthlyTickersItemTitle,
	MonthlyTickersItemMoney,
	MonthlyTickersItemItemsWrapper,
	MonthlyTickersItemItemsText,
} from './styles';
import Button from '@components/Button';
import TickersList from '@components/TickersList';

import type { Stocks } from '@constants/stocks/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { RenderSearchTypeButtonItem, RenderMonthlyTickersInfoItem } from './types';
import type { ListRenderItemInfo } from 'react-native';

interface SearchCategories {
	searchType: string;
	searchCategory: string;
}

interface Transaction {
	result: number;
	value: number;
}

type TransactionItem = Transaction | null;
type TransactionsInfo = [TransactionItem, TransactionItem];

const HomeScreen = () => {
	const [stocks, setStocks] = useState<Stocks[] | null>([]);
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const user = useAppSelector((store) => store.createUserSlice.user);
	const [sortCategories, setSortCategories] = useState<SearchCategories>({
		searchType: 'All',
		searchCategory: 'All',
	});
	const [transactionsListInfo, setTransactionsListInfo] = useState<TransactionsInfo>([null, null]);
	const [error, setError] = useState<string>('');
	const monthlyTickersInfo = [
		{
			title: 'Buy monthly',
			moneyInfo: transactionsListInfo[0] ? transactionsListInfo[0].result : 0,
			items: transactionsListInfo[0] ? transactionsListInfo[0].value : 0,
		},
		{
			title: 'Sold monthly',
			moneyInfo: transactionsListInfo[1] ? transactionsListInfo[1].result : 0,
			items: transactionsListInfo[1] ? transactionsListInfo[1].value : 0,
		},
	];
	const screenWidth = Dimensions.get('screen').width;
	const screenHeight = Dimensions.get('screen').width;
	const tickersListSearchButtonPosition = screenWidth - screenWidth * 0.18;

	const handleChooseStocksCategory = () => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchType: 'stock',
			};
		});
	};
	const handleChooseETFCategory = () => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchType: 'etf',
			};
		});
	};
	const handleBoundsCategory = () => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchType: 'bound',
			};
		});
	};
	const handleAllCategory = () => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchType: 'All',
			};
		});
	};

	const handleSetSearchCategory = (category: string) => {
		setSortCategories((prev) => {
			return {
				...prev,
				searchCategory: category,
			};
		});
	};

	const searchTypesButtons = useGetButtonsForSearchStocksType(
		handleChooseStocksCategory,
		handleChooseETFCategory,
		handleBoundsCategory,
		handleAllCategory
	);

	const clearAppData = async function () {
		try {
			const keys = await AsyncStorage.getAllKeys();
			await AsyncStorage.multiRemove(keys);
		} catch (error) {
			console.error('Error clearing app data.');
		}
	};

	// clearAppData();

	const renderSearchTypeButton = ({ item }: ListRenderItemInfo<RenderSearchTypeButtonItem>) => {
		const itemType = item.type.toLowerCase().split('').includes('s')
			? item.type.toLowerCase().slice(0, item.type.toLowerCase().length - 1)
			: item.type.toLowerCase();
		const isButtonActive = sortCategories.searchType.toLowerCase() === itemType;

		return (
			<Button
				width={screenWidth >= 390 ? 85 : 80}
				height={32}
				bgColor={isButtonActive ? '#9D7830' : '#363534'}
				bRadius={8}
				onPress={item.handler}
			>
				<SearchTypeText>{item.type}</SearchTypeText>
			</Button>
		);
	};

	const renderMonthlyTickersInfo = ({ item }: ListRenderItemInfo<RenderMonthlyTickersInfoItem>) => {
		return (
			<MonthlyTickersInfoItemWrapper>
				<MonthlyTickersItemTitle>{item.title}</MonthlyTickersItemTitle>
				<MonthlyTickersItemMoney>{`${item.moneyInfo}$`}</MonthlyTickersItemMoney>
				<MonthlyTickersItemItemsWrapper>
					<MonthlyTickersItemItemsText>{`${item.items} ${item.items > 1 ? 'items' : 'item'}`}</MonthlyTickersItemItemsText>
				</MonthlyTickersItemItemsWrapper>
			</MonthlyTickersInfoItemWrapper>
		);
	};

	//Run this if you want upload stocks to the DB
	// useEffect(() => {
	// 	const handleUploadStockToTheDB = async () => {
	// 		const response = await handleUploadStocks();

	// 		console.log(response);
	// 	};

	// 	handleUploadStockToTheDB();
	// }, []);

	//Run this if you want upload stocks to the DB
	useEffect(() => {
		const handleGetDataFromTheDB = async () => {
			const response = await getSellAndBuyUserTransactionsAPI(user?.id);
			if (response && typeof response === 'string') {
				setError(FIREBASE_ERROR[response]);
			} else if (response && typeof response !== 'string') {
				setTransactionsListInfo(response);
			}
		};

		handleGetDataFromTheDB();
	}, []);

	const handleNavigateToAnalytics = () => {
		navigation.navigate('AnalyticsStackScreen');
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

	return (
		<Wrapper>
			<HomeHeader title='Welcome to Home' handleNavigateToAnalytics={handleNavigateToAnalytics} />
			<SearchTypesButtonsWrapper>
				<FlatList
					horizontal
					keyExtractor={({ type }) => type}
					data={searchTypesButtons}
					renderItem={renderSearchTypeButton}
					contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
				/>
			</SearchTypesButtonsWrapper>
			<MonthlyTickersInfoWrapper>
				<FlatList
					horizontal
					keyExtractor={({ title }) => title}
					data={monthlyTickersInfo}
					renderItem={renderMonthlyTickersInfo}
					contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
				/>
			</MonthlyTickersInfoWrapper>
			<TickersList
				tickersListSearchButtonPosition={tickersListSearchButtonPosition}
				renderData={stocks}
				searchCategories={sortCategories}
				maxHeightForList={screenHeight >= 844 ? 380 : 250}
				handleSetSearchCategory={handleSetSearchCategory}
			/>
		</Wrapper>
	);
};

export default HomeScreen;
