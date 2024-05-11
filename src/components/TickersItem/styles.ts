import styled from 'styled-components/native';

export const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #8f723a;
	border-radius: 10px;
	margin: 5px 0;
	padding: 5px 53px 5px 20px;
	height: 54px;
`;

export const TickerInfo = styled.View`
	display: flex;
	flex-direction: row;
	max-width: 200px;
	align-items: center;
`;

export const TickersImageWrapper = styled.View`
	width: 37px;
	height: 37px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #ffffff;
	margin-right: 8px;
`;

export const TickersDescriptionWrapper = styled.View`
	max-width: 160px;
`;

export const TickersTitle = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 15px;
	line-height: 21px;
	color: #ffffff;
`;

export const TickersDescription = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 12px;
	line-height: 21px;
	color: #ffffff;
`;

export const PriceText = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 13px;
	line-height: 21px;
	color: #ffffff;
`;

export const PriceWrapper = styled.View`
	max-width: 100px;
`;
