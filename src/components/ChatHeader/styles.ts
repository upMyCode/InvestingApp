import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 90%;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #8f723a;
	height: 70px;
	margin-left: 5%;
	border-radius: 10px;
	margin-top: 10px;
	margin-bottom: 20px;
`;

export const UserProfileTextView = styled.View`
	width: 46px;
	height: 46px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 46px;
	background-color: #ffffff;
`;

export const UserProfileText = styled.Text`
	color: #dcaf57;
	font-family: 'Inter-Regular';
	font-size: 16px;
`;

export const UserProfileUserInfo = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 16px;
	color: #ffffff;
`;

export const UserProfileUserInfoView = styled.View`
	display: flex;
	align-items: center;
	margin-left: 20px;
`;

export const ButtonText = styled.Text`
	color: #ffffff;
	font-family: 'Inter-Regular';
	font-size: 16px;
`;

export const ButtonWrapper = styled.View`
	display: flex;
	justify-content: center;
	margin-left: 20px;
	height: 70px;
	margin-right: 20px;
`;
