import { FlatList, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { handleUploadStocks, handleGetAllStocks } from '@api/stocks/stocksHelpers';
import { useNavigation } from '@react-navigation/core';
import Header from '@components/Header';
import { useGetButtonsForSearchStocksType } from '@hooks/useGetButtonsForSearchStocksType/useGetButtonsForSearchStocksType';
import { Wrapper, SearchTypesButtonsWrapper, SearchTypeText } from './styles';
import Button from '@components/Button';
import TickersList from '@components/TickersList';
import FinanceDiagram from '@components/FinanceDiagram';

import type { Stocks } from '@constants/stocks/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { RenderSearchTypeButtonItem, RenderMonthlyTickersInfoItem } from '../HomeScreen/types';
import type { ListRenderItemInfo } from 'react-native';

interface SearchCategories {
	searchType: string;
	searchCategory: string;
}

const AnalyticsScreen = () => {
	const [stocks, setStocks] = useState<Stocks[] | null>([]);
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const [sortCategories, setSortCategories] = useState<SearchCategories>({
		searchType: 'All',
		searchCategory: 'All',
	});
	const [error, setError] = useState<string>('');
	const monthlyTickersInfo = [
		{
			title: 'Buy monthly',
			moneyInfo: 0,
			items: 0,
		},
		{
			title: 'Sold monthly',
			moneyInfo: 0,
			items: 0,
		},
	];
	const screenWidth = Dimensions.get('screen').width;
	const screenHeight = Dimensions.get('screen').width;

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

	//Run this if you want upload stocks to the DB
	// useEffect(() => {
	// 	const handleUploadStockToTheDB = async () => {
	// 		const response = await handleUploadStocks();

	// 		console.log(response);
	// 	};

	// 	handleUploadStockToTheDB();
	// }, []);

	const handleNavigateToBackScreen = () => {
		navigation.goBack();
	};

	const handleNavigateToCalculatorScreen = () => {
		navigation.navigate('CalculatorScreen');
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
			<Header
				title='Analytics'
				handlerForReturnToPage={handleNavigateToBackScreen}
				isCalculatorNavigationActive
				calculatorNavigationHandler={handleNavigateToCalculatorScreen}
			/>
			<SearchTypesButtonsWrapper>
				<FlatList
					horizontal
					keyExtractor={({ type }) => type}
					data={searchTypesButtons}
					renderItem={renderSearchTypeButton}
					contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
				/>
			</SearchTypesButtonsWrapper>
			<FinanceDiagram searchType={sortCategories.searchType} />
			<TickersList
				renderData={stocks}
				searchCategories={sortCategories}
				maxHeightForList={screenHeight >= 844 ? 380 : 250}
				handleSetSearchCategory={handleSetSearchCategory}
			/>
		</Wrapper>
	);
};

export default AnalyticsScreen;
