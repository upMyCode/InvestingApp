import * as yup from 'yup';

const validationSchema = yup.object().shape({
	balance: yup
		.string()
		.required('Ввод баланса обязателен!')
		.min(1, 'Минимальное коликство символов 1')
		.max(16, 'Максимальное коликство символов 13')
		.matches(/^[0-9]*$/, 'Введите только цифры!'),
});

export default validationSchema;
