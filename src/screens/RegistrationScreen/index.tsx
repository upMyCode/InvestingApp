import { Image } from 'react-native';
import React from 'react';
import { MainWrapper, Wrapper, Description, ImageWrapper, ImageView } from './styles';
import { RegistrationScreenLogoIMG } from '@helpers/imagesResolve';
import { registrationScreenDimensions } from '@constants/dimensions';
import RegistrationForm from '@forms/RegistrationForm';

const RegistrationScreen = () => {
	return (
		<MainWrapper>
			<Wrapper>
				<Description>Регистрация</Description>
				<ImageWrapper>
					<ImageView
						source={{ uri: RegistrationScreenLogoIMG }}
						width={registrationScreenDimensions.logoWidth}
						height={registrationScreenDimensions.logoHeight}
					/>
				</ImageWrapper>
				<RegistrationForm />
			</Wrapper>
		</MainWrapper>
	);
};

export default RegistrationScreen;
