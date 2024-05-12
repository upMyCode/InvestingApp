import { ModifiedStocks } from '@constants/stocks/types';

export const getPriceListInThisWeek = (modifiedStocks: ModifiedStocks[]) => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const curr = new Date();
	const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
	const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay() - 6));

	const modifiedStocksListWithCorrectDate = modifiedStocks.map((stock: ModifiedStocks) => {
		const date = new Date(stock.modifiedDate);
		return {
			...stock,
			modifiedDate: date,
			dayName: days[date.getDay()],
			date: date.toDateString(),
		};
	});
	const correctDaysForCurrentWeek = modifiedStocksListWithCorrectDate.filter(
		(item) => item.modifiedDate >= firstDay && item.modifiedDate <= lastDay
	);
	const unique = [];

	const duplicates = correctDaysForCurrentWeek.filter((o) => {
		if (unique.find((i) => i.date === o.date)) {
			return true;
		}

		unique.push(o);
		return false;
	});

	let maxDateInDuplicate;

	for (let i = 0; i < duplicates.length; ++i) {
		maxDateInDuplicate = duplicates[i].modifiedDate;

		for (let j = 1; j < duplicates.length - 1; ++j) {
			if (maxDateInDuplicate < duplicates[j].modifiedDate) {
				maxDateInDuplicate = duplicates[j].modifiedDate;
			}
		}
	}

	const maxDuplicateItem = correctDaysForCurrentWeek.find((item) => item.modifiedDate === maxDateInDuplicate);

	unique.push(maxDuplicateItem);

	const result = unique.map((item) => {
		return {
			weekDay: item?.dayName,
			price: item.priceAfter,
		};
	});
	console.log(result);
};
