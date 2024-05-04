type Handler = () => void;

export const useGetButtonsForSearchStocksType = (
	handleChooseStocksCategory: Handler,
	handleChooseETFCategory: Handler,
	handleBoundsCategory: Handler
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
	];
};
