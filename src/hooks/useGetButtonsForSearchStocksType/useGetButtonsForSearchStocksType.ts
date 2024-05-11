type Handler = () => void;

export const useGetButtonsForSearchStocksType = (
	handleChooseStocksCategory: Handler,
	handleChooseETFCategory: Handler,
	handleBoundsCategory: Handler,
	handleAllCategory: Handler
) => {
	return [
		{
			type: 'Stocks',
			handler: handleChooseStocksCategory,
		},
		{
			type: 'ETF',
			handler: handleChooseETFCategory,
		},
		{
			type: 'Bounds',
			handler: handleBoundsCategory,
		},
		{
			type: 'All',
			handler: handleAllCategory,
		},
	];
};
