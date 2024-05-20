type Handler = () => void;

export const useGetUserProfileButtons = (changeUserInfoHandler: Handler, changeYourPortfolioHandler: Handler, handleLogout: Handler) => {
	return [
		{
			type: 'Change user info',
			handler: changeUserInfoHandler,
		},
		{
			type: 'Change your portfolio',
			handler: changeYourPortfolioHandler,
		},
		{
			type: 'Log out',
			handler: handleLogout,
		},
	];
};
