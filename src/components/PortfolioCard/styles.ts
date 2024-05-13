import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 90%;
	margin-top: 55px;
	display: flex;
	align-items: center;
`;

export const Content = styled.View`
	width: 313px;
	height: 200px;
	background-color: #363534;
	border-radius: 15px;
	display: flex;
	align-items: center;
`;

export const ContentHeaderWrapper = styled.View`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 19px;
`;

export const PortfolioTitle = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 16px;
	color: #ffffff;
`;

export const ButtonText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 14px;
	color: #ffffff;
`;

export const PortfolioBalanceContainer = styled.View`
	width: 85%;
	margin-top: 22px;
`;

export const PortfolioBalanceText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 24px;
	color: #ffffff;
`;

export const PortfolioFooterContainer = styled.View`
	width: 100%;
	display: flex;
	align-items: center;
	margin-top: 72.5px;
`;

export const PortfolioFooterLine = styled.View`
	width: 80px;
	height: 2px;
	background-color: #ffffff;
`;
