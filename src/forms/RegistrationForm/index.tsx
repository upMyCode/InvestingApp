import { RegistrationFormDimensions } from '@constants/dimensions';
import textStrings from '@constants/textStrings/textStrings';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import Input from '@components/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startScreenDimensions } from '@constants/dimensions';
import { View } from 'react-native';
import { getError } from './helpers/getError/getError';
import { FormWrapper, RegistrationButtonContainer, RegistrationErrorText, ButtonText } from './styles';
import { FormValues } from './types';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { handleSignUpAPI } from '@api/auth/loginAPI';
import validationSchema from './validationSchema';
import { registrationFormDefaultState } from './constants/registrationFormDefaultState';
import { UnRegistrationScreenParamList } from '@screens/StartScreen/types';
import { getRegistrationFormData } from './helpers/getRegistrationFormData/getRegistrationFormData';

import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';

export default function RegistrationForm() {
	const [registrationError, setRegistrationError] = useState<string>('');
	const navigation = useNavigation<StackNavigationProp<UnRegistrationScreenParamList>>();
	const { registrationScreenButtonText } = textStrings;

	const handleNavigateToLogIn = () => {
		navigation.navigate('LogInScreen');
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: registrationFormDefaultState,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const formData = getRegistrationFormData(errors);

	const handleSubmitForm = async (data: FormValues) => {
		const response = await handleSignUpAPI(data.useremail, data.userpassword, data.username);

		if (response && typeof response === 'string') {
			setRegistrationError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
			handleNavigateToLogIn();
		}
	};
	return (
		<View>
			<FormWrapper>
				{formData.map(({ errors, maxLength, name, placeholder, formType, secureTextEntry }) => {
					const error = getError(name, errors);
					return (
						<Input
							key={name}
							control={control}
							name={name}
							formType={formType}
							placeholder={placeholder}
							maxLength={maxLength}
							secureTextEntry={!!secureTextEntry}
							error={error ?? ''}
						/>
					);
				})}
				{registrationError && <RegistrationErrorText>{registrationError}</RegistrationErrorText>}
			</FormWrapper>
			<RegistrationButtonContainer>
				<Button
					width={startScreenDimensions.buttonWidth}
					height={startScreenDimensions.buttonHeight}
					bRadius={startScreenDimensions.buttonRadius}
					bColor='1px solid rgba(0, 0, 0, 0.2)'
					boxShadow
					bgColor='#FFFFFF'
					mt={80}
					onPress={handleSubmit(handleSubmitForm)}
				>
					<ButtonText>{registrationScreenButtonText}</ButtonText>
				</Button>
			</RegistrationButtonContainer>
		</View>
	);
}
