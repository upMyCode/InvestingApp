import textStrings from '@constants/textStrings/textStrings';
import type { FormValues } from '../../types';
import type { FieldErrors } from 'react-hook-form';
import type { GetRegistrationFormFormDataOutput } from './types';

export const getRegistrationFormData = (errors: FieldErrors<FormValues>): GetRegistrationFormFormDataOutput[] => {
	const { userNameInput, userEmailInput, userPasswordInput, userConfirmPassword } = textStrings.formInputs;

	return [
		{
			...userNameInput,
			errors: errors,
			maxLength: 32,
		},
		{
			...userEmailInput,
			errors: errors,
			maxLength: 32,
		},
		{
			...userPasswordInput,
			errors: errors,
			maxLength: 32,
			secureTextEntry: true,
		},
		{
			...userConfirmPassword,
			errors: errors,
			maxLength: 32,
			secureTextEntry: true,
		},
	];
};
