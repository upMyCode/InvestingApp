import { firebase } from '@react-native-firebase/database';
import { STOCKS } from '@constants/stocks/stocks';

import type { ApplyTransactionInfo } from '@forms/AddTransactionForm/types';

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

export const handleAddUserTransactionAPI = async (uid: string, transaction: ApplyTransactionInfo): Promise<boolean | null | string> => {
	try {
		const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/transactions/${uid}`);

		const transactionsUserDataSnapshot = await authReference.once('value');
		const transactionsData = transactionsUserDataSnapshot.val();

		if (!transactionsData) {
			authReference.set([transaction]);
		} else {
			authReference.set([...transactionsData, transaction]);
		}

		return true;
	} catch (error: unknown) {
		if (isError(error)) {
			return error.code;
		}
		return '';
	}
};

export const getSellAndBuyUserTransactionsAPI = async (uid: string) => {
	try {
		const authReference = firebase.app().database('https://investingapp-55c90-default-rtdb.firebaseio.com').ref(`/transactions/${uid}`);

		const transactionsUserDataSnapshot = await authReference.once('value');
		const transactionsData = transactionsUserDataSnapshot.val();

		if (transactionsData) {
			const sellStocks = Object.values(transactionsData).filter((stock) => stock.operationType === 'Sell');
			const buyStocks = Object.values(transactionsData).filter((stock) => stock.operationType === 'Buy');
			let sellStocksValue = 0;
			let sellStocksTotal = 0;
			let buyStocksValue = 0;
			let buyStocksTotal = 0;
			let sellStocksData = null;
			let buyStocksData = null;

			if (sellStocks.length > 0) {
				sellStocksValue = sellStocks.map((stock) => Number(stock.stocksValue)).reduce((acc, stock) => (acc += stock), 0);
				sellStocksTotal = Number(
					sellStocks
						.map((stock) => Number(stock.result))
						.reduce((acc, stock) => (acc += stock), 0)
						.toFixed(2)
				);

				sellStocksData = {
					value: sellStocksValue,
					result: sellStocksTotal,
				};
			}

			if (buyStocks.length > 0) {
				buyStocksValue = buyStocks.map((stock) => Number(stock.stocksValue)).reduce((acc, stock) => (acc += stock), 0);
				buyStocksTotal = Number(
					buyStocks
						.map((stock) => Number(stock.result))
						.reduce((acc, stock) => (acc += stock), 0)
						.toFixed(2)
				);

				buyStocksData = {
					value: buyStocksValue,
					result: buyStocksTotal,
				};
			}

			return [buyStocksData, sellStocksData];
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
