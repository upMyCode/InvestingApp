import { InputDimensions } from '@constants/dimensions';
import { ComplicityPasswordDarkTheme, InputDarkTheme } from '@theme/colors';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';

import { CustomInput, FormContainer, InputErrorText, Wrapper, InputTitle, InputTitleAsterix } from './styles';
import type { InputProps } from './types';

export default function PortfolioInput<T extends FieldValues>({
	formType,
	maxLength,
	placeholder,
	control,
	name,
	secureTextEntry,
	error,
	title,
}: InputProps<T>) {
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
								<CustomInput
									editable
									value={value}
									onChangeText={onChange}
									maxLength={maxLength}
									placeholder={placeholder}
									keyboardType={formType}
									placeholderTextColor='#FFFFFF'
									secureTextEntry={secureTextEntry}
									onBlur={onBlur}
									autoCapitalize='none'
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
