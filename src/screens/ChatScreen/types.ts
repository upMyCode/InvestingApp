import type { Stocks } from '@constants/stocks/types';

type Handler = () => void;

export interface USER {
	id: string;
	username: string;
	useremail: string;
	userbalance: number;
	userstocks: Stocks[] | string;
	lastMsg?: string;
	roomId?: string;
}

export interface RenderUserChatButtonsItem extends USER {
	type: string;
	handler: Handler;
}
