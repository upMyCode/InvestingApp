import { CrossLogoIMG } from '@helpers/imagesResolve';
import Button from '@components/Button';
import React from 'react';
import { Image, Modal, Text } from 'react-native';

import { Content, ContentHeader, ContentMain, HeaderButtonContainer, HeaderText, Wrapper } from './styles';
import { ModalProps } from './types';

export default function ModalContainer({ children, title, modalVisible, handleModalOnClose, fSize, fLineHeight, width }: ModalProps) {
	return (
		<Modal
			animationType='slide'
			transparent
			visible={modalVisible}
			onRequestClose={() => {
				handleModalOnClose();
			}}
		>
			<Wrapper>
				<Content width={width}>
					<ContentHeader>
						<HeaderText fSize={fSize} fLineHeight={fLineHeight}>
							{title}
						</HeaderText>
						<HeaderButtonContainer>
							<Button width={20} height={20} bgColor='#C44E0C' bRadius={20} boxShadow={false} onPress={handleModalOnClose}>
								<Image source={{ uri: CrossLogoIMG }} width={15} height={15} />
							</Button>
						</HeaderButtonContainer>
					</ContentHeader>
					<ContentMain>{children}</ContentMain>
				</Content>
			</Wrapper>
		</Modal>
	);
}
