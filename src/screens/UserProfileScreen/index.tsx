import { FlatList } from 'react-native';
import Button from '@components/Button';
import {
	Wrapper,
	UserProfileTextView,
	UserProfileText,
	UserProfileUserInfoView,
	UserProfileUserInfo,
	ButtonText,
	ButtonWrapper,
} from './styles';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/core';
import { getNameAndSurnameFirstChar } from '@helpers/getNameAndSurnameFirstChar';
import { useGetUserProfileButtons } from '@hooks/useGetUserProfileButtons/useGetUserProfileButtons';
import ModalContainer from '@components/ModalContainer';
import ChangeUserNameForm from '@forms/ChangeUserNameForm';
import { handleLogoutAPI } from '@api/auth/loginAPI';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
import { useEffect } from 'react';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabScreensParamList } from '@screens/TabScreens/types';
import type { RenderUserProfileButtonsItem } from './types';
import type { ListRenderItemInfo } from 'react-native';

const UserProfileScreen = () => {
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const navigation = useNavigation<StackNavigationProp<TabScreensParamList>>();
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const user = useAppSelector((store) => store.createUserSlice.user);

	const handleNavigateToBackScreen = () => {
		navigation.goBack();
	};

	const handleNavigateToPortfolioScreen = () => {
		navigation.navigate('PortfolioScreen');
	};

	const handleOpenChangeUserNameModal = () => {
		setModalVisible(true);
	};

	const handleCloseChangeUserNameModal = () => {
		setModalVisible(false);
	};

	const handleLogOut = async () => {
		const response = await handleLogoutAPI();
		if (response && typeof response === 'string') {
			setError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
			navigation.goBack();
			dispatch(updateUser(null));
		}
	};

	const userProfileButtons = useGetUserProfileButtons(handleOpenChangeUserNameModal, handleNavigateToPortfolioScreen, handleLogOut);

	const renderUserProfileButtonsItem = ({ item }: ListRenderItemInfo<RenderUserProfileButtonsItem>) => {
		return (
			<ButtonWrapper>
				<Button width={311} height={45} bgColor='#363534' bRadius={10} onPress={item.handler} mt={14}>
					<ButtonText>{item.type}</ButtonText>
				</Button>
			</ButtonWrapper>
		);
	};

	return (
		<Wrapper>
			<Header title='Profile' handlerForReturnToPage={handleNavigateToBackScreen} />
			<UserProfileTextView>
				<UserProfileText>{getNameAndSurnameFirstChar(user?.username || '')}</UserProfileText>
			</UserProfileTextView>
			<UserProfileUserInfoView>
				<UserProfileUserInfo>{user?.username || ''}</UserProfileUserInfo>
			</UserProfileUserInfoView>
			<FlatList keyExtractor={({ type }) => type} data={userProfileButtons} renderItem={renderUserProfileButtonsItem} />
			{isModalVisible && (
				<ModalContainer
					title='Change user name'
					width={313}
					handleModalOnClose={handleCloseChangeUserNameModal}
					fSize={16}
					modalVisible={isModalVisible}
				>
					<ChangeUserNameForm />
				</ModalContainer>
			)}
		</Wrapper>
	);
};

export default UserProfileScreen;
