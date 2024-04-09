import * as yup from 'yup';

const validationSchema = yup.object().shape({
	useremail: yup.string().required('E-mail обязателен!').email('Вы ввели некорректный email!'),
	userpassword: yup
		.string()
		.required('Пароль обязателен!')
		.min(4, 'Минимальное коликство символов пароля 4')
		.max(16, 'Максимальное коликство символов пароля 16')
		.matches(/^((?=^\S+$)(?=.*\d)(?=.*[a-zA-Z]).{4,})$/, 'Пароль должен быть сложным и без пробелов!'),
});

export default validationSchema;
