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

export interface ChatHeaderProps {
	receiverData: USER;
	handleChatClose: () => void;
}

export interface Message {
	from: string;
	id: string;
	message: string;
	msgType: string;
	roomId: string;
	sendTime: string;
	to: string;
}
