import { ModifiedStocks } from '@constants/stocks/types';

export interface FinanceDiagramProps {
	searchType: string;
	modifiedStocks: ModifiedStocks[] | undefined;
}
