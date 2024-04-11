import type { FormValues } from '../../types';
import type { FieldErrors } from 'react-hook-form';
import type { KeyboardType } from 'react-native';

export interface GetRegistrationFormFormDataOutput {
	name: 'username' | 'useremail' | 'userpassword' | 'userconfirmpassword';
	placeholder: string;
	formType: KeyboardType | undefined;
	errors: FieldErrors<FormValues>;
	maxLength: number;
	secureTextEntry?: boolean;
}
