import type { Stocks } from '@constants/stocks/types';
export interface User {
	id: string;
	username: string;
	useremail: string;
	balance: number;
	userstocks: Stocks[] | null;
}

export interface State {
	user: User | null;
}
