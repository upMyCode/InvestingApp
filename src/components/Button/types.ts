import { ReactElement, ReactNode } from 'react';

export interface ButtonProps {
	width?: number | string;
	height?: number;
	bgColor?: string;
	bRadius?: number;
	bColor?: string;
	children?: ReactNode[] | ReactElement | undefined | ReactNode;
	onPress: undefined | (() => void);
	boxShadow?: boolean;
	mt?: number;
	ml?: number;
	disabled?: boolean | undefined;
}

export interface PaintedButtonProps {
	width?: number | string;
	height?: number;
	bgColor?: string;
	bRadius?: number;
	bColor?: string;
	boxShadow?: boolean;
	mt?: number;
	ml?: number;
}
