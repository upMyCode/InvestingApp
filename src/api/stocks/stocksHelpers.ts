import { firebase } from '@react-native-firebase/database';
import { STOCKS } from '@constants/stocks/stocks';

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

export const handleUploadStocks = async () => {
	try {
		const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/stocks`);

		console.log(STOCKS[0].modifiedStocks);

		if (authReference) {
			await authReference.set(STOCKS);

			return true;
		}
		return false;
	} catch (error: unknown) {
		if (isFirebaseError(error)) {
			return error.code;
		}
		return '';
	}
};

export const handleGetAllStocks = async () => {
	try {
		const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/stocks`);

		const stocksDataSnapshot = await authReference.once('value');
		const stocksListData = stocksDataSnapshot.val();

		if (stocksListData) {
			return stocksListData;
		}

		return null;
	} catch (error: unknown) {
		if (isFirebaseError(error)) {
			return error.code;
		}
		return '';
	}
};
