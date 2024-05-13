export interface ModifiedStocks {
	modifiedDate: Date | string;
	priceBefore: number;
	priceAfter: number;
	changes: number;
}

export interface Stocks {
	symbol: string;
	price: number;
	beta: number;
	volAvg: number;
	mktCap: number;
	lastDiv: number;
	range: string;
	companyName: string;
	currency: string;
	cik: string;
	isin: string | null;
	cusip: string | null;
	exchange: string;
	exchangeShortName: string;
	industry: string;
	description: string;
	ceo: string;
	sector: string;
	country: string;
	image: string;
	type: string;
	website?: null | string;
	changes: number;
	modifiedStocks: ModifiedStocks[];
}
