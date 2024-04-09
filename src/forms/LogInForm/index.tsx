import { RegistrationFormDimensions } from '@constants/dimensions';
import textStrings from '@constants/textStrings';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import Input from '@components/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startScreenDimensions } from '@constants/dimensions';
import { View, Text } from 'react-native';

import { FormWrapper, RegistrationButtonContainer, RegistrationErrorText, ButtonText } from './styles';
import { FormValues } from './types';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { handleSignInAPI } from '@api/auth/loginAPI';
import validationSchema from './validationSchema';
import { logInFormDefaultState } from './constants/logInFormDefaultState';
import { UnRegistrationScreenParamList } from '@screens/StartScreen/types';

import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';

export default function LogInForm() {
	const [registrationError, setRegistrationError] = useState<string>('');
	const navigation = useNavigation<StackNavigationProp<UnRegistrationScreenParamList>>();
	const { inputUserEmail, inputUserPassword, logInScreenButtonText } = textStrings;

	const handleNavigateToLogIn = () => {
		navigation.navigate('LogInScreen');
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: logInFormDefaultState,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const handleSubmitForm = async (data: FormValues) => {
		const response = await handleSignInAPI(data.useremail, data.userpassword);

		if (response && typeof response === 'string') {
			setRegistrationError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
		}
	};
	return (
		<View>
			<FormWrapper>
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
					<ButtonText>{logInScreenButtonText}</ButtonText>
				</Button>
			</RegistrationButtonContainer>
		</View>
	);
}
