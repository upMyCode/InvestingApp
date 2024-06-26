import { Control, FieldValues, Path } from 'react-hook-form';
import type { KeyboardType } from 'react-native';

export interface FormValuesRegistration {
  username: string;
  usersurname: string;
  useremail: string;
  userpassword: string;
}

export interface FormValuesLogIn {
  useremail: string;
  userpassword: string;
}
export interface InputProps<T extends FieldValues> {
  formType: KeyboardType | undefined;
  maxLength: number;
  placeholder: string;
  icon: string;
  name: Path<T>;
  control: Control<T, any>;
  secureTextEntry?: boolean | undefined;
  error: string;
  modalName?: string;
}

export interface PasswordComplicityItemProps {
  bgColor: string;
}