import { RegistrationFormDimensions } from '@constants/dimensions';
import textStrings from '@constants/textStrings';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import Input from '@components/Input';
import { RegistrationFormDarkTheme } from '@theme/colors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startScreenDimensions } from '@constants/dimensions';
import { View, Text } from 'react-native';

import { FormWrapper, RegistrationButtonContainer, RegistrationErrorText, ButtonText } from './styles';
import { FormValues, RegistrationFormProps } from './types';
import validationSchema from './validationSchema';

export default function RegistrationForm() {
	const [registrationError, setRegistrationError] = useState<string>('');

	const defaultValues = {
		username: '',
		useremail: '',
		userpassword: '',
		userconfirmpassword: '',
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const handleSubmitForm = async (data: FormValues) => {
		console.log(data)
		// const response = await handleSignUpAPI(data.useremail, data.userpassword, data.username, data.usersurname);
		// if (response && typeof response === 'string') {
		// 	setRegistrationError(FIREBASE_ERROR[response]);
		// } else if (response && typeof response !== 'string') {
		// }
	};

	return (
		<View>
			<FormWrapper>
				<Input
					control={control}
					name='username'
					formType='default'
					placeholder={textStrings.registrationScreenInputUserName}
					maxLength={RegistrationFormDimensions.inputMLength}
					error={errors.username?.message ?? ''}
				/>
				<Input
					control={control}
					name='useremail'
					formType='default'
					placeholder={textStrings.registrationScreenInputUserEmail}
					maxLength={RegistrationFormDimensions.inputMLength}
					error={errors.useremail?.message ?? ''}
				/>
				<Input
					control={control}
					name='userpassword'
					formType='default'
					placeholder={textStrings.registrationScreenInputUserPassword}
					maxLength={RegistrationFormDimensions.inputMLengthXL}
					secureTextEntry
					error={errors.userpassword?.message ?? ''}
				/>
				<Input
					control={control}
					name='userconfirmpassword'
					formType='default'
					placeholder={textStrings.registrationScreenInputConfirmUserPassword}
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
