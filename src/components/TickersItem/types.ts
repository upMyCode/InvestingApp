export interface TickersItemProps {
	industry: string;
	symbol: string;
	image: string;
	price: number;
	isSelected?: boolean;
}

export interface WrapperProps {
	isSelected?: boolean;
}
