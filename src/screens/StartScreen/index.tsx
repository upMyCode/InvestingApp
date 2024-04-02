import { Image } from 'react-native';
import { StartScreenLogoIMG } from '@helpers/imagesResolve';
import { StartScreenDimensions } from '@constants/dimensions';
import { Wrapper, Description, ButtonText, MainWrapper, styles, ButtonWrapper } from './styles';
import React from 'react';
import textStrings from '@constants/textStrings';
import Button from '@components/Button';
import { UnRegistrationScreenParamList } from './types';
import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';

export default function StartScreen() {
	const navigation = useNavigation<StackNavigationProp<UnRegistrationScreenParamList>>();
	const handleNavigateToRegistration = () => {
		navigation.navigate('RegistrationScreen');
	};
	return (
		<MainWrapper>
			<Wrapper>
				<Image
					source={{ uri: StartScreenLogoIMG }}
					width={StartScreenDimensions.logoWidth}
					height={StartScreenDimensions.logoHeight}
				/>
				<Wrapper contentContainerStyle={styles.alignPosition}>
					<Description>{textStrings.startScreenDescription}</Description>
				</Wrapper>
				<ButtonWrapper>
					<Button
						width={StartScreenDimensions.buttonWidth}
						height={StartScreenDimensions.buttonHeight}
						bRadius={StartScreenDimensions.buttonRadius}
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
