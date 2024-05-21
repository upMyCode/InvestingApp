import React, { Component, useEffect, useState } from 'react';
import { Wrapper, UserProfileTextView, UserProfileText, UserProfileUserInfo, UserProfileUserInfoView, ButtonWrapper } from './styles';
import { ArrowLogoIMG } from '@helpers/imagesResolve';
import { getNameAndSurnameFirstChar } from '@helpers/getNameAndSurnameFirstChar';
import { Image } from 'react-native';
import Button from '@components/Button';

import type { ChatHeaderProps } from './types';

const ChatHeader = ({ receiverData, handleChatClose }: ChatHeaderProps) => {
	return (
		<Wrapper>
			<ButtonWrapper>
				<Button width={30} height={30} bgColor='#DCAF57' bRadius={30} onPress={handleChatClose}>
					<Image source={{ uri: ArrowLogoIMG }} width={12} height={12} />
				</Button>
			</ButtonWrapper>
			<UserProfileTextView>
				<UserProfileText>{getNameAndSurnameFirstChar(receiverData.username || '')}</UserProfileText>
			</UserProfileTextView>
			<UserProfileUserInfoView>
				<UserProfileUserInfo>{receiverData?.username || ''}</UserProfileUserInfo>
			</UserProfileUserInfoView>
		</Wrapper>
	);
};

export default ChatHeader;
