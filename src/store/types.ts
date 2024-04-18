interface USER {
	id: string;
	username: string;
	useremail: string;
}

interface User {
	user: USER | null;
}

export interface State {
	createUserSlice: User;
}
