import { RegistrationFormDimensions } from '@constants/dimensions';
import textStrings from '@constants/textStrings';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import Input from '@components/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startScreenDimensions } from '@constants/dimensions';
import { View } from 'react-native';

import { FormWrapper, RegistrationButtonContainer, RegistrationErrorText, ButtonText } from './styles';
import { FormValues } from './types';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { handleSignUpAPI } from '@api/auth/loginAPI';
import validationSchema from './validationSchema';
import { registrationFormDefaultState } from './constants/registrationFormDefaultState';
import { UnRegistrationScreenParamList } from '@screens/StartScreen/types';

import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';

export default function RegistrationForm() {
	const [registrationError, setRegistrationError] = useState<string>('');
	const navigation = useNavigation<StackNavigationProp<UnRegistrationScreenParamList>>();
	const { inputUserName, inputUserEmail, inputUserPassword, inputConfirmUserPassword } = textStrings;

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
				<Input
					control={control}
					name='username'
					formType='default'
					placeholder={inputUserName}
					maxLength={RegistrationFormDimensions.inputMLength}
					error={errors.username?.message ?? ''}
				/>
				<Input
					control={control}
					name='useremail'
					formType='default'
					placeholder={inputUserEmail}
					maxLength={RegistrationFormDimensions.inputMLength}
					error={errors.useremail?.message ?? ''}
				/>
				<Input
					control={control}
					name='userpassword'
					formType='default'
					placeholder={inputUserPassword}
					maxLength={RegistrationFormDimensions.inputMLengthXL}
					secureTextEntry
					error={errors.userpassword?.message ?? ''}
				/>
				<Input
					control={control}
					name='userconfirmpassword'
					formType='default'
					placeholder={inputConfirmUserPassword}
					maxLength={RegistrationFormDimensions.inputMLengthXL}
					secureTextEntry
					error={errors.userconfirmpassword?.message ?? ''}
				/>
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
					<ButtonText>{textStrings.registrationScreenButtonText}</ButtonText>
				</Button>
			</RegistrationButtonContainer>
		</View>
	);
}
