import { Alert } from 'react-native';

import { removeMathExpression } from '@slices/mathExpressionSlice';
import { AppDispatch } from '../store';

const handleAlertsForUncorrectMathResult = (dispatch: AppDispatch, result: string) => {
	if (/[A-Za-z]+/.test(result) && result !== 'Infinity' && result !== '-Infinity') {
		Alert.alert('Expression error', 'Please close all brackets and add correct expression', [
			{
				text: 'Ok',
				onPress: () => {},
			},
			{
				text: 'Clear an expression',
				onPress: () => {
					dispatch(removeMathExpression());
				},
			},
		]);
		return true;
	}
	if (result === 'Infinity' || result === '-Infinity') {
		Alert.alert('You should not divide by 0');
		return true;
	}
	return false;
};

export default handleAlertsForUncorrectMathResult;
