export const sliceDescription = (description: string) => {
	const maxSymbols = 25;
	const indent = 2;

	if (description.length > maxSymbols) {
		return description.substring(0, maxSymbols - indent) + '...';
	}

	return description;
};
