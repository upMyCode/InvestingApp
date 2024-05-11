import React from 'react';
import { View, Image } from 'react-native';
import Button from '@components/Button';
import { Wrapper, Text, Content, ButtonsList } from './styles';
import { ArrowLogoIMG, CalculatorLogoIMG } from '@helpers/imagesResolve';

import type { HeaderProps } from './types';

const Header = ({ title, handlerForReturnToPage, isCalculatorNavigationActive, calculatorNavigationHandler }: HeaderProps) => {
	return (
		<Wrapper>
			<Content>
				<Text>{title}</Text>
				<ButtonsList>
					{isCalculatorNavigationActive && (
						<Button width={24} height={24} bgColor='transparent' onPress={calculatorNavigationHandler}>
							<Image source={{ uri: CalculatorLogoIMG }} width={20} height={20} />
						</Button>
					)}
					<Button width={53} height={30} bgColor='#363534' bRadius={10} onPress={handlerForReturnToPage} ml={12}>
						<Image source={{ uri: ArrowLogoIMG }} width={15} height={15} />
					</Button>
				</ButtonsList>
			</Content>
		</Wrapper>
	);
};

export default Header;
