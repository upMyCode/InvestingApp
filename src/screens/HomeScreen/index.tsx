import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { handleUploadStocks, handleGetAllStocks } from '@api/stocks/stocksHelpers';
import { useNavigation } from '@react-navigation/core';
import HomeHeader from '@components/HomeHeader';
import { useGetButtonsForSearchStocksType } from '@hooks/useGetButtonsForSearchStocksType/useGetButtonsForSearchStocksType';
import { Wrapper, SearchTypesButtonsWrapper, SearchTypeText } from './styles';
import Button from '@components/Button';

import type { Stocks } from '@constants/stocks/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { RenderSearchTypeButtonItem } from './types';
import type { ListRenderItemInfo } from 'react-native';

interface SearchCategories {
	searchType: string;
	searchCategory: string;
}

const HomeScreen = () => {
	const [stocks, setStocks] = useState<Stocks[] | null>([]);
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const [sortCategories, setSortCategories] = useState<SearchCategories>({
		searchType: '',
		searchCategory: '',
	});
	const [error, setError] = useState<string>('');

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

	const searchTypesButtons = useGetButtonsForSearchStocksType(handleChooseStocksCategory, handleChooseETFCategory, handleBoundsCategory);

	const renderSearchTypeButton = ({ item }: ListRenderItemInfo<RenderSearchTypeButtonItem>) => {
		return (
			<Button width={107} height={32} bgColor='#363534' bRadius={8} onPress={item.handler}>
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
		</Wrapper>
	);
};

export default HomeScreen;
