import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import { topUpFormDefaultState } from './constants/topUpFormDefaultState';
import React from 'react';
import PortfolioInput from '@components/PortfolioInput';
import { Wrapper, ButtonText, ButtonWrapper } from './styles';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import FIREBASE_ERROR from '@constants/firebaseErrors';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
import { handleUpdateUserDataInAPI } from '@api/auth/loginAPI';

import type { FormValues } from './types';

const TopUpForm = () => {
	const [registrationError, setRegistrationError] = useState<string>('');
	const user = useAppSelector((store) => store.createUserSlice.user);
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: topUpFormDefaultState,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const handleSubmitForm = async (data: FormValues) => {
		const response = await handleUpdateUserDataInAPI(user?.id, user.balance + Number(data.balance));
		if (response && typeof response === 'string') {
			setRegistrationError(FIREBASE_ERROR[response]);
		} else if (response && typeof response !== 'string') {
			dispatch(
				updateUser({
					...user,
					balance: user.balance + Number(data.balance),
				})
			);
		}
	};
	return (
		<Wrapper>
			<PortfolioInput
				title='Balance'
				key='balance'
				control={control}
				name='balance'
				formType='default'
				placeholder='Please enter a balance'
				maxLength={16}
				secureTextEntry={false}
				error={errors.balance?.message ?? ''}
			/>
			<ButtonWrapper>
				<Button width={120} height={34} bRadius={10} bgColor='#8F723A' onPress={handleSubmit(handleSubmitForm)}>
					<ButtonText>Top Up</ButtonText>
				</Button>
			</ButtonWrapper>
		</Wrapper>
	);
};

export default TopUpForm;
