import type { FormValues } from '../../types';
import type { FieldErrors } from 'react-hook-form';
import type { KeyboardType } from 'react-native';

export interface GetLogInFormFormDataOutput {
	name: 'useremail' | 'userpassword' | any;
	placeholder: string;
	formType: KeyboardType | undefined;
	errors: FieldErrors<FormValues>;
	maxLength: number;
	secureTextEntry?: boolean;
}
