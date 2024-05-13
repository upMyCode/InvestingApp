type Months =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const createDateForStocksForYear = (month: Months) => {
	let date = new Date();
	let delta = 0;
	const currentMonth = months[date.getMonth() + 1];
	const currentMonthPos = months.indexOf(currentMonth);
	const monthPos = months.indexOf(month);

	delta = monthPos - currentMonthPos;
	date.setMonth(date.getMonth() + delta);

	return date.toString();
};
