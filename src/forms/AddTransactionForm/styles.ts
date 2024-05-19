import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Wrapper = styled.View`
	width: 100%;
	align-items: center;
`;

export const ButtonText = styled.Text`
	font-size: 15px;
	color: #ffffff;
	font-family: 'Inter-Regular';
`;

export const ButtonTextTop = styled.Text`
	font-size: 12px;
	color: #ffffff;
	font-family: 'Inter-Regular';
`;

export const ButtonWrapper = styled.View`
	margin: 10px 0;
	padding: 20px;
`;

export const ButtonListTop = styled.View`
	display: flex;
	flex-direction: row;
`;

export const ButtonListTopWrapper = styled.View`
	width: 90%;
	align-items: flex-end;
`;

export const TransactionButtonWrapper = styled.View`
	width: 38px;
	height: 26px;
	shadow-color: '#171717';
    shadow-Offset: {width: -2, height: 4};
    shadowOpacity: 0.2;
    shadowRadius: 3;
`;

export const TransactionInfo = styled.View`
	width: 80%;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
`;

export const TransactionTotalView = styled.View`
	width: 50%;
`;

export const TransactionInfoView = styled.View`
	width: 50%;
	margin-left: 5px;
`;

export const TransactionTotalText = styled.Text`
	font-size: 18px;
	color: #ffffff;
	font-family: 'Inter-Regular';
`;

export const TransactionResultText = styled.Text`
	font-size: 11px;
	color: #ffffff;
	font-family: 'Inter-Regular';
`;

export const styles = StyleSheet.create({
	shadowProp: {
		width: 38,
		height: 28,
		shadowColor: '#171717',
		shadowOffset: { width: 0, height: 2.5 },
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 3,
	},
});

export const TransactionErrorText = styled.Text`
	margin-top: 2px;
	font-family: 'Inter-Medium';
	color: #ed051c;
	line-height: 21px;
	font-size: 14px;
	max-width: 210px;
`;
