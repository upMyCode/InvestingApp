export const getNameAndSurnameFirstChar = (userName: string): string => {
	const [name, surname] = userName.split(' ');

	if (name && surname) {
		return `${name[0]}${surname[0]}`;
	} else {
		return name[0];
	}
};
