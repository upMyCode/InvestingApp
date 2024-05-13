import { ModifiedStocks } from '@constants/stocks/types';

export const getPriceListInThisDay = (modifiedStocks: ModifiedStocks[]) => {
	const dayHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const isCurrentDay = (d1: Date, d2: Date) => {
		return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
	};

	const currentDay = new Date();
	const currentDayValues = modifiedStocks
		.filter((stock) => {
			const date = new Date(stock.modifiedDate);
			return isCurrentDay(currentDay, date);
		})
		.map((data) => {
			const date = new Date(data.modifiedDate);
			return {
				...data,
				hour: date.getHours(),
			};
		})
		.sort((a, b) => {
			const hourDayCurrent = a?.hour;
			const hourDayNext = b?.hour;

			return hourDayCurrent - hourDayNext;
		})
		.map((data) => {
			delete data.modifiedDate;
			return data;
		});

	const currentDayWithoutDuplicates = Object.values(currentDayValues.reduce((acc, cur) => Object.assign(acc, { [cur.hour]: cur }), {}));
	const lastHourInArray = currentDayWithoutDuplicates[currentDayWithoutDuplicates.length - 1].hour;
	const resArr = [];
	let firstItem = 0;
	let lastItem = 0;
	let price = 0;

	for (let i = 0; i < 24; ++i) {
		const findHour = currentDayWithoutDuplicates.find((data) => data.hour === i);

		if (findHour) {
			price = findHour.priceBefore;
			lastItem = findHour.hour;

			for (let j = firstItem; j < lastItem; ++j) {
				if (findHour && j + 1 === findHour.hour) {
					resArr.push({
						priceBefore: price,
						priceAfter: price,
						hour: j,
					});

					continue;
				}

				resArr.push({
					priceBefore: price,
					priceAfter: price,
					hour: j,
				});
			}

			if (findHour.hour === lastHourInArray) {
				price = findHour.priceAfter;

				for (let c = lastHourInArray; c < 24; ++c) {
					resArr.push({
						priceBefore: price,
						priceAfter: price,
						hour: c,
					});
				}
			}

			firstItem = findHour.hour;
			lastItem++;
		}
	}

	const resultArrayWithHours = [...currentDayWithoutDuplicates, ...resArr].sort((a, b) => {
		const hourDayCurrent = a?.hour;
		const hourDayNext = b?.hour;

		return hourDayCurrent - hourDayNext;
	});

	const result = Object.values(resultArrayWithHours.reduce((acc, cur) => Object.assign(acc, { [cur.hour]: cur }), {}));

	return result.map((data) => data.priceAfter);
};
