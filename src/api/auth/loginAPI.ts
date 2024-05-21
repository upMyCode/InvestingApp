import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import type { Stocks } from '@constants/stocks/types';
import type { ApplyTransactionInfo } from '@forms/AddTransactionForm/types';
export interface USER {
	id: string;
	username: string;
	useremail: string;
	userbalance: number;
	userstocks: Stocks[] | string;
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

export const handleUpdateUserDataNameInAPI = async (uid: string, name: string): Promise<boolean | null | string> => {
	try {
		const authReference = firebase
			.app()
			.database('https://investingapp-55c90-default-rtdb.firebaseio.com')
			.ref(`/users/${uid}`)
			.update({
				username: name,
			});

		return true;
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};

export const handleUpdateUserStocksDataInAPI = async (uid: string, stock: Stocks, type: string): Promise<boolean | null | string> => {
	try {
		if (type === 'Buy') {
			const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/users/${uid}`);

			const userDataSnapshot = await authReference.once('value');
			const userData = userDataSnapshot.val();

			let stocks = [];

			if (!!!userData.userstocks) {
				stocks = [stock];
			}

			if (userData.userstocks === 'empty') {
				stocks = [stock];
			}

			if (userData.userstocks !== 'empty' && !!userData.userstocks) {
				if (userData.userstocks.length > 0) {
					const findStock = userData.userstocks.find((item) => item.symbol === stock.symbol);

					if (findStock) {
						stocks = userData.userstocks.map((item) => {
							if (item.symbol === stock.symbol) {
								return {
									...item,
									value: item.value + stock.value,
								};
							}

							return item;
						});
					} else {
						stocks = [...userData.userstocks, stock];
					}
				}
			}

			authReference.update({
				userstocks: stocks,
			});

			const authReferenceToStocks = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/stocks`);

			const userDataStocksSnapshot = await authReferenceToStocks.once('value');
			const userDataStocks = userDataStocksSnapshot.val();
			const choosedStock = userDataStocks.find((data) => data.symbol === stock.symbol);

			choosedStock.value = choosedStock.value - stock.value;

			if (choosedStock.value === 0) {
				const newStocksData = userDataStocks.filter((data) => data.symbol !== stock.symbol);

				authReferenceToStocks.set(newStocksData);
			} else {
				const newStocksData = userDataStocks.map((data) => {
					if (data.symbol === stock.symbol) {
						return choosedStock;
					} else {
						return data;
					}
				});

				authReferenceToStocks.set(newStocksData);
			}
		}

		if (type === 'Sell') {
			const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/users/${uid}`);
			const authReferenceToStocks = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/stocks`);
			const userDataSnapshot = await authReference.once('value');
			const userData = userDataSnapshot.val();
			const userDataStocksSnapshot = await authReferenceToStocks.once('value');
			const userDataStocks = userDataStocksSnapshot.val();
			const findStock = userDataStocks.find((item) => stock.symbol === item.symbol);

			if (userData) {
				console.log(1, userData);
				if (userData.userstocks || userData.userstocks !== 'empty') {
					const currentUserStock = userData.userstocks.find((item) => item.symbol === stock.symbol);
					console.log(2, currentUserStock);

					if (currentUserStock) {
						currentUserStock.value = currentUserStock.value - stock.value;

						if (currentUserStock.value === 0) {
							const newStockList = userData.userstocks.filter((item) => item.symbol !== stock.symbol);

							authReference.update({
								userstocks: newStockList,
							});
						} else {
							const newStockList = userData.userstocks.filter((item) => item.symbol !== stock.symbol);
							authReference.update({
								userstocks: [...newStockList, currentUserStock],
							});
						}
					} else {
						return 'Stock is not found';
					}
				}
			}

			if (findStock) {
				const newStocksList = userDataStocks.map((item) => {
					if (item.symbol === stock.symbol) {
						return {
							...item,
							value: item.value + stock.value,
						};
					}

					return item;
				});
				authReferenceToStocks.set(newStocksList);
			} else {
				const newStocksList = userDataStocks.concat(stock);

				authReferenceToStocks.set(newStocksList);
			}
		}

		return true;
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return 'Err';
	}
};

export const handleGetUserStocksDataInAPI = async (uid: string): Promise<null | string> => {
	try {
		const authReferenceToStocks = firebase
			.app()
			.database('https://investingapp-55c90-default-rtdb.firebaseio.com')
			.ref(`/users/${uid}`);

		const userDataStocksSnapshot = await authReferenceToStocks.once('value');
		const userDataStocks = userDataStocksSnapshot.val();

		if (userDataStocks.userstocks !== 'empty' && userDataStocks.userstocks) {
			return userDataStocks.userstocks;
		} else {
			return null;
		}
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};

export const handleLogoutAPI = async (): Promise<boolean | null | string> => {
	try {
		await auth().signOut();

		return true;
	} catch (error: unknown) {
		if (isFirebaseError(error)) {
			return error.code;
		}
		return '';
	}
};

export const getAllUsersAPI = async (uid: string): Promise<USER[] | null | string> => {
	try {
		const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/users`);

		const userData = await authReference.once('value');
		const userDataSnapshot = userData.val();
		const usersList = [];

		for (let [key, value] of Object.entries(userDataSnapshot)) {
			usersList.push(value);
		}

		const response: unknown[] | undefined = usersList.filter((user) => user.id !== uid);

		if (response) {
			return response as USER[];
		} else {
			return null;
		}
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};
