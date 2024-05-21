import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	display: flex;
	align-items: center;
`;

export const UserProfileTextView = styled.View`
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 36px;
	background-color: #ffffff;
`;

export const UserProfileText = styled.Text`
	color: #dcaf57;
	font-family: 'Inter-Regular';
	font-size: 14px;
`;

export const UserProfileUserInfo = styled.Text`
	font-family: 'Inter-Regular';
	font-size: 20px;
	color: #dcaf57;
`;

export const UserProfileUserInfoView = styled.View`
	display: flex;
	width: 100%;
	align-items: center;
	margin-top: 25px;
`;

export const ChatWithUsersWrapper = styled.ScrollView`
	margin-top: 20px;
`;

export const ChatItem = styled.View`
	width: 90%;
	display: flex;
	flex-direction: row;
`;

export const UserChatItemInfo = styled.View`
	display: flex;
	height: 40px;
`;

export const UserChatItemInfoUserName = styled.Text`
	margin-left: 5px;
	color: #ffffff;
	font-family: 'Inter-Regular';
	font-size: 12px;
`;
