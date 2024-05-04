export interface HomeHeaderProps {
	title: string;
	handlerForNavigateToAdminPanel?: () => void;
	isAdmin?: boolean;
	handleNavigateToAnalytics: () => void;
}
