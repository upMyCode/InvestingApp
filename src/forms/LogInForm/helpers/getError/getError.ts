import type { FormValues } from '@forms/RegistrationForm/types';
import type { FieldErrors } from 'react-hook-form';

export const getError = (name: string, errors: FieldErrors<FormValues>): string | undefined => {
	if (Object.keys(errors).length !== 0) {
		switch (name) {
			case 'useremail': {
				return 'useremail' in errors ? errors.useremail?.message : '';
			}
			case 'userpassword': {
				return 'userpassword' in errors ? errors.userpassword?.message : '';
			}
		}
	}
};
