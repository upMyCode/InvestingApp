import { TextStrings } from './types';

const textStrings: TextStrings = {
	startScreenDescription:
		'Приложение freeInvestingToday – это путь к финасовой независимости и новому миру возможностей для сберержения средств.',
	startScreenButtonText: 'Начать инвестировать',
	registrationScreenButtonText: 'Зарегистрироваться',
	logInScreenButtonText: 'Войти',
	formInputs: {
		userNameInput: {
			name: 'username',
			placeholder: 'Введите имя пользователя',
			formType: 'default',
		},
		userEmailInput: {
			name: 'useremail',
			placeholder: 'Введите email пользователя',
			formType: 'default',
		},
		userPasswordInput: {
			name: 'userpassword',
			placeholder: 'Введите пароль',
			formType: 'default',
		},
		userConfirmPassword: {
			name: 'userconfirmpassword',
			placeholder: 'Введите подтвержение пароля',
			formType: 'default',
		},
	},
};

export default textStrings;
