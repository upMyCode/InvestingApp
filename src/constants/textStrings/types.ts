import type { KeyboardType } from 'react-native';

interface StringsInput {
	name: ('username' | 'useremail' | 'userpassword' | 'userconfirmpassword') | ('useremail' | 'userpassword');
	placeholder: string;
	formType: KeyboardType | undefined;
}

interface FormInputs {
	userNameInput: StringsInput;
	userEmailInput: StringsInput;
	userPasswordInput: StringsInput;
	userConfirmPassword: StringsInput;
}

export interface TextStrings {
	startScreenDescription: string;
	startScreenButtonText: string;
	registrationScreenButtonText: string;
	logInScreenButtonText: string;
	formInputs: FormInputs;
}
