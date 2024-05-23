import { Image } from 'react-native';
import { StartScreenLogoIMG } from '@helpers/imagesResolve';
import { startScreenDimensions } from '@constants/dimensions';
import { Wrapper, Description, ButtonText, MainWrapper, styles, ButtonWrapper, ImageView } from './styles';
import React from 'react';
import textStrings from '@constants/textStrings/textStrings';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { StackScreenParamList } from '@screens/StackScreen/types';

export default function StartScreen() {
	const navigation = useNavigation<StackNavigationProp<StackScreenParamList>>();
	const handleNavigateToRegistration = () => {
		navigation.navigate('RegistrationScreen');
	};
	return (
		<MainWrapper>
			<Wrapper>
				<ImageView
					source={{ uri: StartScreenLogoIMG }}
					width={startScreenDimensions.logoWidth}
					height={startScreenDimensions.logoHeight}
				/>
				<Wrapper contentContainerStyle={styles.alignPosition}>
					<Description>{textStrings.startScreenDescription}</Description>
				</Wrapper>
				<ButtonWrapper>
					<Button
						width={startScreenDimensions.buttonWidth}
						height={startScreenDimensions.buttonHeight}
						bRadius={startScreenDimensions.buttonRadius}
						onPress={handleNavigateToRegistration}
						bColor='1px solid rgba(0, 0, 0, 0.2)'
						boxShadow
						bgColor='#FFFFFF'
						mt={80}
					>
						<ButtonText>{textStrings.startScreenButtonText}</ButtonText>
					</Button>
				</ButtonWrapper>
			</Wrapper>
		</MainWrapper>
	);
}
