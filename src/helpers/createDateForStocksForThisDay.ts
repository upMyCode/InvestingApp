export const createDateForStocksForThisDay = (hour: number) => {
	return new Date(new Date().valueOf() - 1000 * 60 * 60 * hour);
};
