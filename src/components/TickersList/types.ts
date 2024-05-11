import type { Stocks } from '@constants/stocks/types';

interface SearchCategories {
	searchType: string;
	searchCategory: string;
}

export interface TickersListProps {
	searchCategories: SearchCategories;
	renderData: Stocks[] | null;
	maxHeightForList: number;
	handleSetSearchCategory: (category: string) => void;
}

export interface WrapperProps {
	maxHeightForList: number;
}
