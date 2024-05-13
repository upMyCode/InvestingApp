type WeekDays = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const createDateForStocksForThisWeek = (day: WeekDays) => {
	let date = new Date();
	let delta = 0;
	const currentDay = weekDays[date.getDate() + 1];
	const currentDayPos = weekDays.indexOf(currentDay);
	const dayPos = 7 - (1 + weekDays.indexOf(day));

	delta = dayPos;
	date.setDate(date.getDate() - delta);

	return date.toString();
};
