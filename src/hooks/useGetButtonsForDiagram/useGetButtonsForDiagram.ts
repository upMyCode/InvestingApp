type Handler = () => void;

export const useGetButtonsForDiagram = (chooseDayHandler: Handler, chooseWeekHandler: Handler) => {
	return [
		{
			type: 'Day',
			handler: chooseDayHandler,
		},
		{
			type: 'Week',
			handler: chooseWeekHandler,
		},
	];
};
