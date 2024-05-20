import * as yup from 'yup';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Имя пользоватиеля обязаельно!')
		.matches(/^[a-zA-Z ]+$/, 'Должны быть только буквы')
		.min(2, 'Минимальное количество букв 2!')
		.max(32, 'Максимальное количество букв 32!'),
});

export default validationSchema;
