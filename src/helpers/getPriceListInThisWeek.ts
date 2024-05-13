import { ModifiedStocks } from '@constants/stocks/types';

export const getPriceListInThisWeek = (modifiedStocks: ModifiedStocks[]) => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const sorter = {
		// "sunday": 0, // << if sunday is first day of week
		mon: 1,
		tue: 2,
		wed: 3,
		thu: 4,
		fri: 5,
		sat: 6,
		sun: 7,
	};

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
		(item) => item.modifiedDate >= firstDay && item.modifiedDate < lastDay.setDate(lastDay.getDate() + 1)
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
	const resUniqueArr = unique.filter((date) => date.date !== maxDuplicateItem.date);

	if (duplicates.length > 0) {
		resUniqueArr.push(maxDuplicateItem);
	}

	const middleResult = resUniqueArr
		.map((item) => {
			return {
				weekDay: item?.dayName,
				price: item?.priceAfter,
			};
		})
		.sort((a, b) => {
			const weekDayCurrent = a?.weekDay?.toLocaleLowerCase();
			const weekDayNext = b?.weekDay.toLocaleLowerCase();

			return sorter[weekDayCurrent] - sorter[weekDayNext];
		});

	const result = Object.values(middleResult.reduce((acc, cur) => Object.assign(acc, { [cur.weekDay]: cur }), {}));

	const resultDataSet = {
		dates: Array.from(new Set(result.map((item) => item.weekDay))),
		values: result.map((item) => item.price),
	};
	return resultDataSet;
};
