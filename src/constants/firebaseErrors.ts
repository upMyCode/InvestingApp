interface FirebaseError {
	[key: string]: string;
}

const FIREBASE_ERROR: FirebaseError = {
	'auth/weak-password': 'The password must be 6 long or more.',
	'auth/email-already-in-use': 'Current user already exists',
	'auth/internal-error': 'The current user is not exists',
};

export default FIREBASE_ERROR;
