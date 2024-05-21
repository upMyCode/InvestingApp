import textStrings from '@constants/textStrings/textStrings';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import Input from '@components/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startScreenDimensions } from '@constants/dimensions';
import { useAppDispatch } from '@store/hooks';
import { View } from 'react-native';

import { FormWrapper, RegistrationButtonContainer, RegistrationErrorText, ButtonText } from './styles';
import { FormValues } from './types';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { handleSignInAPI } from '@api/auth/loginAPI';
import validationSchema from './validationSchema';
import { logInFormDefaultState } from './constants/logInFormDefaultState';
import { getLogInFormData } from './helpers/getLogInFormData/getLogInFormData';
import { getError } from './helpers/getError/getError';
import { createNewUser } from '@slices/createUserSlice/createUserSlice';
import { useNavigation } from '@react-navigation/core';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { StackScreenParamList } from '@screens/StackScreen/types';

export default function LogInForm() {
	const [registrationError, setRegistrationError] = useState<string>('');
	const navigation = useNavigation<StackNavigationProp<StackScreenParamList>>();
	const { logInScreenButtonText } = textStrings;

	const handleNavigateToLogIn = () => {
		navigation.navigate('LogInScreen');
	};

	const dispatch = useAppDispatch();

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

		console.log(response);

		if (response && typeof response === 'string') {
			console.log(FIREBASE_ERROR[response]);
			setRegistrationError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
			const USER = {
				id: response.id,
				username: response.username,
				useremail: response.useremail,
				balance: response.userbalance,
				userstocks: null,
			};
			dispatch(createNewUser(USER));
		}
	};

	const formData = getLogInFormData(errors);
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
					<ButtonText>{logInScreenButtonText}</ButtonText>
				</Button>
			</RegistrationButtonContainer>
		</View>
	);
}
