import textStrings from '@constants/textStrings/textStrings';
import type { FormValues } from '../../types';
import type { FieldErrors } from 'react-hook-form';
import type { GetLogInFormFormDataOutput } from './types';

export const getLogInFormData = (errors: FieldErrors<FormValues>): GetLogInFormFormDataOutput[] => {
	const { userEmailInput, userPasswordInput } = textStrings.formInputs;

	return [
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
	];
};
