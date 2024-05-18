import { Control, FieldValues, Path } from 'react-hook-form';
import type { KeyboardType } from 'react-native';

export interface FormValuesRegistration {
	username: string;
	useremail: string;
	userpassword: string;
	userconfirmpassword: string;
}

export interface FormValuesLogIn {
	useremail: string;
	userpassword: string;
}
export interface PortfolioSelectorProps<T extends FieldValues> {
	formType: KeyboardType | undefined;
	maxLength: number;
	placeholder: string;
	name: Path<T>;
	control: Control<T, any>;
	secureTextEntry?: boolean | undefined;
	error: string;
	modalName?: string;
	title: string;
	data: string[];
	handleFilteredStocks: (filterKey: string, filterType: string) => void;
}

export interface PasswordComplicityItemProps {
	bgColor: string;
}
