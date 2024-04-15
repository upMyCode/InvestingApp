export interface User {
	id: string;
	username: string;
	useremail: string;
}

export interface State {
	user: User | null;
}
