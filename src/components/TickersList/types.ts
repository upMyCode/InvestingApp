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
	isChooseableItems?: boolean;
	handleSelectItem?: (item: Stocks) => void;
	selectedItem?: Stocks | null;
	tickersItemHeight?: number;
	tickersListSearchButtonPosition: number;
	isModal?: boolean;
}

export interface WrapperProps {
	maxHeightForList: number;
}

export interface TickerDescriptionTextProps {
	isModal?: boolean;
}
