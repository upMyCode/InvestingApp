import { View, Text, SafeAreaView, Image } from 'react-native';
import { StartScreenLogoIMG } from '@helpers/imagesResolve';
import { StartScreenDimensions } from '@constants/dimensions';
import { Wrapper, Description, ButtonText, MainWrapper } from './styles';
import React from 'react';
import textStrings from '@constants/textStrings';
import Button from '@components/Button';

export default function StartScreen() {
	return (
		<MainWrapper>
			<Wrapper>
				<Image
					source={{ uri: StartScreenLogoIMG }}
					width={StartScreenDimensions.logoWidth}
					height={StartScreenDimensions.logoHeight}
				/>
				<Wrapper>
					<Description>{textStrings.startScreenDescription}</Description>
				</Wrapper>
				<Button
					width={StartScreenDimensions.buttonWidth}
					height={StartScreenDimensions.buttonHeight}
					bRadius={StartScreenDimensions.buttonRadius}
					bColor='1px solid rgba(0, 0, 0, 0.2)'
					boxShadow
					bgColor='#FFFFFF'
					mt={116}
				>
					<ButtonText>{textStrings.startScreenButtonText}</ButtonText>
				</Button>
			</Wrapper>
		</MainWrapper>
	);
}
