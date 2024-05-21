import { FlatList, Image } from 'react-native';
import Button from '@components/Button';
import database from '@react-native-firebase/database';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import SingleChat from '@components/SingleChat';
import {
	Wrapper,
	ChatWithUsersWrapper,
	ChatItem,
	UserProfileTextView,
	UserProfileText,
	UserChatItemInfo,
	UserChatItemInfoUserName,
} from './styles';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/core';
import { getNameAndSurnameFirstChar } from '@helpers/getNameAndSurnameFirstChar';
import { useGetUserProfileButtons } from '@hooks/useGetUserProfileButtons/useGetUserProfileButtons';
import ModalContainer from '@components/ModalContainer';
import ChangeUserNameForm from '@forms/ChangeUserNameForm';
import { getAllUsersAPI } from '@api/auth/loginAPI';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
import { useEffect } from 'react';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { RenderUserChatButtonsItem, USER } from './types';
import type { ListRenderItemInfo } from 'react-native';

const ChatScreen = () => {
	const [isChatOpen, setChatOpen] = useState<boolean>(false);
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const [userList, setUserList] = useState<null | USER[]>(null);
	const [userSingleChatData, setUserSingleChatData] = useState<USER | null>(null);
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const user = useAppSelector((store) => store.createUserSlice.user);

	const handleNavigateToBackScreen = () => {
		navigation.goBack();
	};

	const handleChatOpen = (data: USER) => {
		setChatOpen(true);

		database()
			.ref('/chatlist/' + user.id + '/' + data.id)
			.once('value')
			.then((snapshot) => {
				if (snapshot.val() == null) {
					let roomId = uuidv4();
					let myData = {
						roomId,
						...user,
						lastMsg: '',
					};

					database()
						.ref('/chatlist/' + data.id + '/' + user.id)
						.update(myData)
						.then(() => console.log('Data updated.'));

					data.lastMsg = '';
					data.roomId = roomId;

					database()
						.ref('/chatlist/' + user.id + '/' + data.id)
						.update(data)
						.then(() => console.log('Data updated.'));

					setUserSingleChatData(data);
				} else {
					setUserSingleChatData(snapshot.val());
				}
			});
	};

	const handleChatClose = () => {
		setChatOpen(false);
	};

	useEffect(() => {
		const handleGetUserDataFromDB = async () => {
			const response = await getAllUsersAPI(user?.id);

			if (response && typeof response === 'string') {
				setError(response);
			} else if (response && typeof response !== 'string') {
				setUserList(response);
			}
		};

		handleGetUserDataFromDB();
	}, []);

	const renderUserProfileButtonsItem = ({ item }: ListRenderItemInfo<RenderUserChatButtonsItem>) => {
		return (
			<Button width={310} height={55} bgColor='#9D7830' bRadius={10} onPress={() => handleChatOpen(item)}>
				<ChatItem>
					<UserProfileTextView>
						<UserProfileText>{getNameAndSurnameFirstChar(item?.username || '')}</UserProfileText>
					</UserProfileTextView>
					<UserChatItemInfo>
						<UserChatItemInfoUserName>{item?.username}</UserChatItemInfoUserName>
					</UserChatItemInfo>
				</ChatItem>
			</Button>
		);
	};

	return (
		<Wrapper>
			<Header title='Chat' handlerForReturnToPage={handleNavigateToBackScreen} />
			{userList && !isChatOpen && (
				<ChatWithUsersWrapper>
					<FlatList keyExtractor={({ id }) => id} data={userList} renderItem={renderUserProfileButtonsItem} />
				</ChatWithUsersWrapper>
			)}
			{isChatOpen && userSingleChatData && <SingleChat handleChatClose={handleChatClose} receiverData={userSingleChatData} />}
		</Wrapper>
	);
};

export default ChatScreen;
