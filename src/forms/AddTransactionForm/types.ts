import type { Stocks } from '@constants/stocks/types';

export interface FormValues {
	transactionTitle: string;
	brokerage: string;
	assets: string;
	stocksValue: string;
	taxRate: string;
}

export interface ApplyTransactionInfo {
	transactionTitle: string;
	brokerage: string;
	assets: string;
	stocksValue: string;
	taxRate: string;
	stock: Stocks | null;
	transactionDate: Date;
	result: number;
	operationType: string;
	id: string;
}

export interface AddTransactionFormProps {
	stocks: Stocks[] | null;
	handleCloseModal: () => void;
}
