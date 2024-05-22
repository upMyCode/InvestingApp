import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	align-items: center;
`;

export const SearchTypesButtonsWrapper = styled.View`
	width: 90%;
	margin-top: 53px;
`;

export const SearchTypeText = styled.Text`
	color: #ffffff;
	font-family: 'Inter-Regular';
	font-size: 16px;
	line-height: 21px;
`;

export const MonthlyTickersInfoWrapper = styled.View`
	width: 80%;
	margin-top: 32px;
`;

export const MonthlyTickersInfoItemWrapper = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 140px;
	height: 120px;
	background-color: #363534;
	border-radius: 10px;
`;

export const MonthlyTickersItemTitle = styled.Text`
	margin-top: 20px;
	color: #ebc67e;
	font-family: 'Inter-Regular';
	font-size: 16px;
`;

export const MonthlyTickersItemMoney = styled(MonthlyTickersItemTitle)`
	margin-top: 15px;
`;

export const MonthlyTickersItemItemsWrapper = styled.View`
	width: 70%;
	display: flex;
	align-items: flex-start;
	margin-top: 20px;
`;

export const MonthlyTickersItemItemsText = styled.Text`
	color: #ebc67e;
	font-family: 'Inter-Regular';
	font-size: 10px;
`;
