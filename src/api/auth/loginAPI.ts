import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import type { Stocks } from '@constants/stocks/types';
export interface USER {
	id: string;
	username: string;
	useremail: string;
	userbalance: number;
	userstocks: Stocks[] | null;
}
interface FirebaseErrorAPI {
	code: string;
	message: string;
}

function isError(candidate: unknown): candidate is Error {
	if (candidate && typeof candidate === 'object' && 'code' in candidate) {
		return true;
	}
	return false;
}

function isFirebaseError(candidate: unknown): candidate is FirebaseErrorAPI {
	if (candidate && typeof candidate === 'object' && 'code' in candidate) {
		return true;
	}
	return false;
}

export const handleSignUpAPI = async (email: string, password: string, name: string): Promise<FirebaseAuthTypes.User | null | string> => {
	try {
		const isUserCreated = await auth().createUserWithEmailAndPassword(email, password);

		if (isUserCreated) {
			const authReference = firebase
				.app()
				.database('https://investingapp-55c90-default-rtdb.firebaseio.com')
				.ref(`/users/${isUserCreated.user.uid}`);

			if (authReference) {
				await authReference.set({
					id: isUserCreated.user.uid,
					username: name,
					useremail: email,
					userbalance: 0,
					userstocks: 'empty',
				});

				return isUserCreated.user;
			}
		}

		return null;
	} catch (error: unknown) {
		if (isFirebaseError(error)) {
			return error.code;
		}
		return '';
	}
};

export const handleSignInAPI = async (email: string, password: string): Promise<USER | null | string> => {
	try {
		const isUserAuth = await auth().signInWithEmailAndPassword(email, password);

		if (isUserAuth) {
			const authReference = firebase
				.app()
				.database('https://investingapp-55c90-default-rtdb.firebaseio.com')
				.ref(`/users/${isUserAuth.user.uid}`);

			const userDataSnapshot = await authReference.once('value');
			const userData = userDataSnapshot.val();
			if (userData) {
				return userData;
			}
		}
		return null;
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};

export const handleUpdateUserDataInAPI = async (uid: string, balance: number): Promise<boolean | null | string> => {
	try {
		const authReference = firebase
			.app()
			.database('https://investingapp-55c90-default-rtdb.firebaseio.com')
			.ref(`/users/${uid}`)
			.update({
				userbalance: balance,
			});

		return true;
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};
