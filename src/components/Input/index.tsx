import { InputDimensions } from '@constants/dimensions';
import { ComplicityPasswordDarkTheme, InputDarkTheme } from '@theme/colors';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';

import {
	CustomInput,
	FormContainer,
	FormImage,
	InputErrorText,
	PasswordComplicityContainer,
	PasswordComplicityItem,
	Wrapper,
} from './styles';
import type { InputProps } from './types';

export default function Input<T extends FieldValues>({
	formType,
	maxLength,
	placeholder,
	icon,
	control,
	name,
	secureTextEntry,
	error,
	modalName,
}: InputProps<T>) {
	const checkPasswordComplicity = (value: string) => {
		const baseComplicityReg = /[A-Z]{1,}/g;
		const extraSymbolsReg = /[.|,|!|?/]/g;
		const rangeFromOneToSevenReg = /^((?=^\S+$)(?=.*\d)(?=.*[A-Za-z]).{1,7})$/;
		const rangeFromEightReg = /^((?=^\S+$)(?=.*\d)(?=.*[A-Za-z]).{8,})$/;
		const rangeFromEightToEleven = /^((?=^\S+$)(?=.*\d)(?=.*[A-Za-z]).{8,11})$/;
		const rangeFromTwelveToEighteen = /^((?=^\S+$)(?=.*\d)(?=.*[A-Za-z]).{12,16})$/;

		if (name === 'userpassword' && value && modalName === 'registration' && !baseComplicityReg.test(value)) {
			return (
				<PasswordComplicityContainer>
					{ComplicityPasswordDarkTheme.complicity1.map((complicity) => {
						return <PasswordComplicityItem bgColor={complicity} key={complicity} />;
					})}
				</PasswordComplicityContainer>
			);
		}
		if (
			name === 'userpassword' &&
			value &&
			modalName === 'registration' &&
			baseComplicityReg.test(value) &&
			((!extraSymbolsReg.test(value) && rangeFromOneToSevenReg.test(value)) ||
				(extraSymbolsReg.test(value) && rangeFromOneToSevenReg.test(value)))
		) {
			return (
				<PasswordComplicityContainer>
					{ComplicityPasswordDarkTheme.complicity2.map((complicity) => {
						return <PasswordComplicityItem bgColor={complicity} key={complicity} />;
					})}
				</PasswordComplicityContainer>
			);
		}
		if (
			name === 'userpassword' &&
			value &&
			modalName === 'registration' &&
			baseComplicityReg.test(value) &&
			((!extraSymbolsReg.test(value) && rangeFromEightReg.test(value)) ||
				(extraSymbolsReg.test(value) && rangeFromEightToEleven.test(value)))
		) {
			return (
				<PasswordComplicityContainer>
					{ComplicityPasswordDarkTheme.complicity3.map((complicity) => {
						return <PasswordComplicityItem bgColor={complicity} key={complicity} />;
					})}
				</PasswordComplicityContainer>
			);
		}
		if (
			name === 'userpassword' &&
			value &&
			modalName === 'registration' &&
			baseComplicityReg.test(value) &&
			extraSymbolsReg.test(value) &&
			rangeFromTwelveToEighteen.test(value)
		) {
			return (
				<PasswordComplicityContainer>
					{ComplicityPasswordDarkTheme.complicity4.map((complicity) => {
						return <PasswordComplicityItem bgColor={complicity} key={complicity} />;
					})}
				</PasswordComplicityContainer>
			);
		}
		return null;
	};

	return (
		<Wrapper>
			<FormImage source={{ uri: icon }} width={InputDimensions.imageWidth} height={InputDimensions.imageHeight} />
			<FormContainer>
				<Controller
					control={control}
					name={name}
					render={({ field: { value, onChange, onBlur } }) => {
						return (
							<View>
								<CustomInput
									editable
									value={value}
									onChangeText={onChange}
									maxLength={maxLength}
									placeholder={placeholder}
									keyboardType={formType}
									placeholderTextColor={InputDarkTheme.placeholder}
									secureTextEntry={secureTextEntry}
									onBlur={onBlur}
									autoCapitalize='none'
								/>
								{checkPasswordComplicity(value)}
							</View>
						);
					}}
				/>
				{error && <InputErrorText>{error}</InputErrorText>}
			</FormContainer>
		</Wrapper>
	);
}
