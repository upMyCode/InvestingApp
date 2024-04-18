export interface FormValues {
	useremail: string;
	userpassword: string;
}

export interface RegistrationFormProps {
	setModalName: React.Dispatch<React.SetStateAction<string>>;
	modalName: string;
}
