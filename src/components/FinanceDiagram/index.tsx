import { FlatList, Dimensions, View, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Wrapper, StockTypeText, DateDiagramButtonsPickerWrapper, SearchDateButtonText, styles } from './styles';
import { useGetButtonsForDiagram } from '@hooks/useGetButtonsForDiagram/useGetButtonsForDiagram';
import Button from '@components/Button';
import { getPriceListInThisWeek } from '@helpers/getPriceListInThisWeek';
import { getPriceListInThisDay } from '@helpers/getPriceListInThisDay';
import { useState } from 'react';

import type { FinanceDiagramProps } from './types';
import type { DiagramButton } from '@hooks/useGetButtonsForDiagram/types';
import type { ListRenderItemInfo } from 'react-native';

const FinanceDiagram = ({ searchType, modifiedStocks }: FinanceDiagramProps) => {
	const firstLetter = searchType[0];
	const [dateButtonType, setDateButtonType] = useState('Day');
	const recreateSearchType = firstLetter.toUpperCase() + searchType.slice(1);
	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const dayHours = [
		'0h',
		'1h',
		'2h',
		'3h',
		'4h',
		'5h',
		'6h',
		'7h',
		'8h',
		'9h',
		'10h',
		'11h',
		'12h',
		'13h',
		'14h',
		'15h',
		'16h',
		'17h',
		'18h',
		'19h',
		'20h',
		'21h',
		'22h',
		'23h',
	];

	const changeDataSet = (dayDataSet, weekDataSet) => {
		if (dateButtonType === 'Day') {
			if (dayDataSet) {
				return dayDataSet;
			} else {
				return [0];
			}
		} else {
			if (weekDataSet) {
				return weekDataSet.values;
			} else {
				return [0];
			}
		}
	};

	const labels = dateButtonType === 'Day' ? dayHours : weekDays;

	const handleSetButtonTypeAsDay = () => {
		setDateButtonType('Day');
	};

	const handleSetButtonTypeAsWeek = () => {
		setDateButtonType('Week');
	};

	const stocksByWeek = modifiedStocks ? getPriceListInThisWeek(modifiedStocks) : null;
	const stocksByDay = modifiedStocks ? getPriceListInThisDay(modifiedStocks) : null;
	const buttonsList = useGetButtonsForDiagram(handleSetButtonTypeAsDay, handleSetButtonTypeAsWeek);
	const dataSet = changeDataSet(stocksByDay, stocksByWeek);

	const renderSearchDateButton = ({ item }: ListRenderItemInfo<DiagramButton>) => {
		return (
			<>
				{item.type === dateButtonType ? (
					<View style={styles.shadowProp}>
						<Button width={32} height={17} bgColor='#1B1A19' bRadius={2} onPress={item.handler}>
							<SearchDateButtonText>{item.type}</SearchDateButtonText>
						</Button>
					</View>
				) : (
					<Button width={32} height={17} bgColor='#1B1A19' bRadius={2} onPress={item.handler}>
						<SearchDateButtonText>{item.type}</SearchDateButtonText>
					</Button>
				)}
			</>
		);
	};

	return (
		<Wrapper horizontal>
			<StockTypeText>{firstLetter === firstLetter.toUpperCase() ? searchType : recreateSearchType}</StockTypeText>
			<DateDiagramButtonsPickerWrapper>
				<FlatList
					horizontal
					keyExtractor={({ type }) => type}
					data={buttonsList}
					renderItem={renderSearchDateButton}
					contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
				/>
			</DateDiagramButtonsPickerWrapper>
			<LineChart
				data={{
					labels: labels,
					datasets: [
						{
							data: dataSet,
						},
					],
				}}
				width={(Dimensions.get('screen').width * labels.length) / 7.75} // from react-native
				height={261}
				yAxisLabel='$'
				yAxisInterval={0.7} // optional, defaults to 1
				chartConfig={{
					backgroundColor: '#363534',
					backgroundGradientFrom: '#363534',
					backgroundGradientTo: '#363534',
					horizontalOffset: 0.5,
					color: () => `#EBC67E`,
					labelColor: () => `#EBC67E`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: '5',
						fill: '#DCAF57',
					},
				}}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
					paddingTop: 35,
					paddingBottom: 5,
					backgroundColor: '#363534',
				}}
			/>
		</Wrapper>
	);
};

export default FinanceDiagram;
