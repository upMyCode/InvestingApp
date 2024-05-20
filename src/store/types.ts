import type { Stocks } from '@constants/stocks/types';
export interface USER {
	id: string;
	username: string;
	useremail: string;
	balance: number;
	userstocks: Stocks[] | null;
}

interface User {
	user: USER | null;
}

export interface State {
	createUserSlice: User;
}
