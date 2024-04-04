export interface FormValues {
	username: string;
	useremail: string;
	userpassword: string;
	userconfirmpassword: string;
}

export interface RegistrationFormProps {
	setModalName: React.Dispatch<React.SetStateAction<string>>;
	modalName: string;
}
