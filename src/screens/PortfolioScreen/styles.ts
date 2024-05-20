import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
`;

export const Content = styled.View`
	width: 100%;
	display: flex;
	align-items: center;
	margin-top: 64px;
`;

export const ContentTitle = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 24px;
`;

export const StockListWrapper = styled.View`
	margin-top: 25px;
	align-items: center;
	width: 93%;
`;

export const UserPortfolioWrapper = styled.View`
	width: 100%;
	align-items: center;
	margin-bottom: 20px;
`;

export const UserPortfolioButtonWrapper = styled.View`
	width: 85%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

export const ButtonText = styled.Text`
	font-family: 'Inter-Medium';
	font-size: 14px;
	color: #ffffff;
`;

export const ButtonWrapper = styled.View`
	position: absolute;
	top: 100%;
`;
