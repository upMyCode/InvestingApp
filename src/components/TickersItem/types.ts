export interface TickersItemProps {
	industry: string;
	symbol: string;
	image: string;
	price: number;
	isSelected?: boolean;
	tickersItemHeight?: number;
	value: number;
	changes: number;
}

export interface WrapperProps {
	isSelected?: boolean;
	tickersItemHeight?: number;
}
