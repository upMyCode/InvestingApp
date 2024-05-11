import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Wrapper, StockTypeText } from './styles';
import React from 'react';

import type { FinanceDiagramProps } from './types';

const FinanceDiagram = ({ searchType }: FinanceDiagramProps) => {
	const firstLetter = searchType[0];
	const recreateSearchType = firstLetter.toUpperCase() + searchType.slice(1);
	return (
		<Wrapper>
			<StockTypeText>{firstLetter === firstLetter.toUpperCase() ? searchType : recreateSearchType}</StockTypeText>
			<LineChart
				data={{
					labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					datasets: [
						{
							data: [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
							],
						},
					],
				}}
				width={Dimensions.get('window').width * 0.9} // from react-native
				height={261}
				yAxisLabel='$'
				yAxisSuffix='k'
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
