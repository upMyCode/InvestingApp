import { Image } from 'react-native';
import React from 'react';
import { MainWrapper, Wrapper, Description, ImageWrapper, ImageView } from './styles';
import { RegistrationScreenLogoIMG } from '@helpers/imagesResolve';
import { registrationScreenDimensions } from '@constants/dimensions';
import LogInForm from '@forms/LogInForm';

const RegistrationScreen = () => {
	return (
		<MainWrapper>
			<Wrapper>
				<Description>Авторизация</Description>
				<ImageWrapper>
					<ImageView
						source={{ uri: RegistrationScreenLogoIMG }}
						width={registrationScreenDimensions.logoWidth}
						height={registrationScreenDimensions.logoHeight}
					/>
				</ImageWrapper>
				<LogInForm />
			</Wrapper>
		</MainWrapper>
	);
};

export default RegistrationScreen;
