import { ReactElement, ReactNode } from 'react';

export interface ModalProps {
	children?: ReactElement | ReactNode[];
	title: string;
	modalVisible: boolean;
	handleModalOnClose: () => void;
	fSize: number;
	fLineHeight?: number;
	width: number;
}

export interface HeaderTextProps {
	fSize: number;
	fLineHeight?: number;
}

export interface ContentProps {
	width: number;
}
