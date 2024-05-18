import { View, Text } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import { topUpFormDefaultState } from './constants/addTransactionFormDefaultState';
import PortfolioInput from '@components/PortfolioInput';
import {
	Wrapper,
	ButtonText,
	ButtonWrapper,
	ButtonListTop,
	ButtonListTopWrapper,
	ButtonTextTop,
	styles,
	TransactionInfo,
	TransactionTotalView,
	TransactionTotalText,
	TransactionResultText,
	TransactionInfoView,
} from './styles';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import PortfolioSelector from '@components/PortfolioSelector';
import { useAppSelector, useAppDispatch } from '@store/hooks';

import FIREBASE_ERROR from '@constants/firebaseErrors';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
import { handleUpdateUserDataInAPI } from '@api/auth/loginAPI';
import type { Stocks } from '@constants/stocks/types';

import type { FormValues, AddTransactionFormProps, ApplyTransactionInfo } from './types';

const AddTransactionForm = ({ stocks }: AddTransactionFormProps) => {
	const [registrationError, setRegistrationError] = useState<string>('');
	const [transactionType, setTransactionType] = useState<string>('Buy');
	const [filteredStocks, setFilteredStocks] = useState<null | Stocks[]>(stocks);
	const user = useAppSelector((store) => store.createUserSlice.user);
	const stockBrokers = Array.from(new Set(filteredStocks?.map((data) => data.broker)));
	const [applyTransactionInfo, setApplyTransactionInfo] = useState<null | ApplyTransactionInfo>(null);
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: topUpFormDefaultState,
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const handleSubmitForm = async (data: FormValues) => {
		const stock = filteredStocks ? filteredStocks[0] : null;
		const tax = Number(data.taxRate) > 0 ? Number(data.taxRate) : 1;

		setApplyTransactionInfo({
			...data,
			stock: stock ?? null,
			transactionDate: new Date(),
			result: stock ? (stock.price * Number(data.stocksValue) * tax) / 100 + stock.price * Number(data.stocksValue) : 0,
			operationType: transactionType,
		});

		console.log(applyTransactionInfo);
		// const response = await handleUpdateUserDataInAPI(user?.id, user.balance + Number(data.balance));
		// if (response && typeof response === 'string') {
		// 	setRegistrationError(FIREBASE_ERROR[response]);
		// } else if (response && typeof response !== 'string') {
		// 	dispatch(
		// 		updateUser({
		// 			...user,
		// 			balance: user.balance + Number(data.balance),
		// 		})
		// 	);
		// }
	};

	console.log(transactionType);

	const handleSetTypeTransaction = (type: string) => {
		setTransactionType(type);
	};

	const handleFilteredStocks = (filterKey: string, filterType: string) => {
		if (filterType === 'broker') {
			setFilteredStocks((prev) => prev?.filter((item) => item.broker === filterKey) || prev);
		}
		if (filterType === 'symbol') {
			setFilteredStocks((prev) => prev?.filter((item) => item.symbol === filterKey) || prev);
		}

		return;
	};

	return (
		<Wrapper>
			<ButtonListTopWrapper>
				<ButtonListTop>
					{transactionType === 'Buy' ? (
						<View style={styles.shadowProp}>
							<Button
								width={38}
								height={24}
								bRadius='10px 0 0 10px'
								bgColor='#C44E0C'
								onPress={() => handleSetTypeTransaction('Buy')}
							>
								<ButtonTextTop>Buy</ButtonTextTop>
							</Button>
						</View>
					) : (
						<Button
							width={38}
							height={24}
							bRadius='10px 0 0 10px'
							bgColor='#C44E0C'
							onPress={() => handleSetTypeTransaction('Buy')}
						>
							<ButtonTextTop>Buy</ButtonTextTop>
						</Button>
					)}
					{transactionType === 'Sell' ? (
						<View style={styles.shadowProp}>
							<Button
								width={38}
								height={24}
								bRadius='0 10px 10px 0'
								bgColor='#C44E0C'
								onPress={() => handleSetTypeTransaction('Sell')}
							>
								<ButtonTextTop>Sell</ButtonTextTop>
							</Button>
						</View>
					) : (
						<Button
							width={38}
							height={24}
							bRadius='0 10px 10px 0'
							bgColor='#C44E0C'
							onPress={() => handleSetTypeTransaction('Sell')}
						>
							<ButtonTextTop>Sell</ButtonTextTop>
						</Button>
					)}
				</ButtonListTop>
			</ButtonListTopWrapper>
			<PortfolioInput
				title='Transaction title'
				key='transactionTitle'
				control={control}
				name='transactionTitle'
				formType='default'
				placeholder='Add title...'
				maxLength={16}
				secureTextEntry={false}
				error={errors.transactionTitle?.message ?? ''}
			/>
			<PortfolioSelector
				title='Brokerage'
				key='brokerage'
				control={control}
				name='brokerage'
				formType='default'
				placeholder='Select broker...'
				maxLength={16}
				secureTextEntry={false}
				data={stockBrokers}
				error={errors.brokerage?.message ?? ''}
				handleFilteredStocks={handleFilteredStocks}
			/>
			<PortfolioSelector
				title='Assets'
				key='assets'
				control={control}
				name='assets'
				formType='default'
				placeholder='Select asset...'
				maxLength={16}
				secureTextEntry={false}
				data={filteredStocks?.map((item) => item.symbol) ?? []}
				error={errors.assets?.message ?? ''}
				handleFilteredStocks={handleFilteredStocks}
			/>
			<PortfolioInput
				title='Stock value'
				key='stocksValue'
				control={control}
				name='stocksValue'
				formType='default'
				placeholder='Add value...'
				maxLength={16}
				secureTextEntry={false}
				error={errors.stocksValue?.message ?? ''}
			/>
			<PortfolioInput
				title='Add tax rate'
				key='taxRate'
				control={control}
				name='taxRate'
				formType='default'
				placeholder='Add tax rate...'
				maxLength={16}
				secureTextEntry={false}
				error={errors.taxRate?.message ?? ''}
			/>
			{applyTransactionInfo && (
				<TransactionInfo>
					<TransactionTotalView>
						<TransactionTotalText>
							{applyTransactionInfo ? `Total: ${applyTransactionInfo.result}$` : 'Total: 0'}
						</TransactionTotalText>
					</TransactionTotalView>
					<TransactionInfoView>
						<TransactionResultText>
							{applyTransactionInfo ? `Type transaction: ${applyTransactionInfo.operationType}` : 'Type transaction:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Date: ${applyTransactionInfo.transactionDate}` : 'Date:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Title: ${applyTransactionInfo.transactionTitle}` : 'Title:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Broker: ${applyTransactionInfo.brokerage}` : 'Broker:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Asset: ${applyTransactionInfo.assets}` : 'Asset:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Stock value: ${applyTransactionInfo.stocksValue}` : 'Stock value:'}
						</TransactionResultText>
						<TransactionResultText>
							{applyTransactionInfo ? `Tax rate: ${applyTransactionInfo.taxRate}%` : 'Tax rate:'}
						</TransactionResultText>
					</TransactionInfoView>
				</TransactionInfo>
			)}

			<ButtonWrapper>
				<Button width={180} height={40} bRadius={10} bgColor='#8F723A' onPress={handleSubmit(handleSubmitForm)}>
					<ButtonText>Apply transaction</ButtonText>
				</Button>
			</ButtonWrapper>
		</Wrapper>
	);
};

export default AddTransactionForm;
