export interface HeaderProps {
	title: string;
	handlerForReturnToPage: () => void;
	isCalculatorNavigationActive?: boolean;
	calculatorNavigationHandler?: () => void;
}
