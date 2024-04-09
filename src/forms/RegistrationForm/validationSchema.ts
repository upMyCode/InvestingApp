import * as yup from 'yup';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Имя пользоватиеля обязаельно!')
		.matches(/^[a-zA-Z]+$/, 'Должны быть только буквы')
		.min(2, 'Минимальное количество букв 2!')
		.max(32, 'Максимальное количество букв 32!'),
	useremail: yup.string().required('E-mail обязателен!').email('Вы ввели некорректный email!'),
	userpassword: yup
		.string()
		.required('Пароль обязателен!')
		.min(4, 'Минимальное коликство символов пароля 4')
		.max(16, 'Максимальное коликство символов пароля 16')
		.matches(/^((?=^\S+$)(?=.*\d)(?=.*[a-zA-Z]).{4,})$/, 'Пароль должен быть сложным и без пробелов!'),
	userconfirmpassword: yup
		.string()
		.oneOf([yup.ref('userpassword')], 'Пароли не совпадают!')
		.required('Повтор пароля обязателен!'),
});

export default validationSchema;
