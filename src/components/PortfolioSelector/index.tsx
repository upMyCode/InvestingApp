import { InputDimensions } from '@constants/dimensions';
import { ComplicityPasswordDarkTheme, InputDarkTheme } from '@theme/colors';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, Text } from 'react-native';
import { ChevronUpLogoIMG, ChevronDownLogoIMG } from '@helpers/imagesResolve';

import {
	CustomInput,
	FormContainer,
	InputErrorText,
	PasswordComplicityContainer,
	PasswordComplicityItem,
	Wrapper,
	styles,
	InputTitle,
	InputTitleAsterix,
} from './styles';
import type { PortfolioSelectorProps } from './types';

export default function PortfolioSelector<T extends FieldValues>({
	formType,
	maxLength,
	placeholder,
	control,
	name,
	secureTextEntry,
	error,
	title,
	data,
	handleFilteredStocks,
}: PortfolioSelectorProps<T>) {
	return (
		<Wrapper>
			<FormContainer>
				<Controller
					control={control}
					rules={{ required: true }}
					name={name}
					render={({ field: { value, onChange, onBlur } }) => {
						return (
							<View>
								<InputTitle>
									{title}
									<InputTitleAsterix> *</InputTitleAsterix>
								</InputTitle>
								<SelectDropdown
									data={data}
									onSelect={(selectedItem, index) => {
										if (name === 'brokerage') {
											handleFilteredStocks(selectedItem, 'broker');
										}

										if (name === 'assets') {
											handleFilteredStocks(selectedItem, 'symbol');
										}

										onChange(selectedItem);
									}}
									renderButton={(selectedItem, isOpened) => {
										return (
											<View style={styles.dropdownButtonStyle}>
												<Text style={styles.dropdownButtonTxtStyle}>{selectedItem || placeholder}</Text>
												{!isOpened ? (
													<Image width={14} height={14} source={{ uri: ChevronDownLogoIMG }} />
												) : (
													<Image width={14} height={14} source={{ uri: ChevronUpLogoIMG }} />
												)}
											</View>
										);
									}}
									renderItem={(item, index, isSelected) => {
										return (
											<View
												style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#8F723A' }) }}
											>
												<Text style={styles.dropdownItemTxtStyle}>{item}</Text>
											</View>
										);
									}}
									showsVerticalScrollIndicator={false}
									dropdownStyle={styles.dropdownMenuStyle}
								/>
							</View>
						);
					}}
				/>
				{error && <InputErrorText>{error}</InputErrorText>}
			</FormContainer>
		</Wrapper>
	);
}
