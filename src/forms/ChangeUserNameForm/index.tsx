import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import { changeUserNameFormDefaultState } from './constants/changeUserNameFormDefaultState';
import React from 'react';
import PortfolioInput from '@components/PortfolioInput';
import { Wrapper, ButtonText, ButtonWrapper } from './styles';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
import { handleUpdateUserDataNameInAPI } from '@api/auth/loginAPI';

import type { FormValues } from './types';

const ChangeUserNameForm = () => {
	const [registrationError, setRegistrationError] = useState<string>('');
	const user = useAppSelector((store) => store.createUserSlice.user);
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: changeUserNameFormDefaultState,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const handleSubmitForm = async (data: FormValues) => {
		const response = await handleUpdateUserDataNameInAPI(user?.id, data.username);
		if (response && typeof response === 'string') {
			setRegistrationError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
			dispatch(
				updateUser({
					...user,
					username: data.username,
				})
			);
		}
	};
	return (
		<Wrapper>
			<PortfolioInput
				title='Change user name'
				key='username'
				control={control}
				name='username'
				formType='default'
				placeholder='Please enter a username'
				maxLength={32}
				secureTextEntry={false}
				error={errors.username?.message ?? ''}
			/>
			<ButtonWrapper>
				<Button width={120} height={34} bRadius={10} bgColor='#8F723A' onPress={handleSubmit(handleSubmitForm)}>
					<ButtonText>Change</ButtonText>
				</Button>
			</ButtonWrapper>
		</Wrapper>
	);
};

export default ChangeUserNameForm;
