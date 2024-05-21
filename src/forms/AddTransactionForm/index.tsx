import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import { topUpFormDefaultState } from './constants/addTransactionFormDefaultState';
import { handleAddUserTransactionAPI } from '@api/stocks/stocksHelpers';
import { updateUser } from '@slices/createUserSlice/createUserSlice';
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
	TransactionErrorText,
} from './styles';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import PortfolioSelector from '@components/PortfolioSelector';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import 'react-native-get-random-values';
import { handleGetUserStocksDataInAPI } from '@api/auth/loginAPI';
import { v4 as uuidv4 } from 'uuid';

import FIREBASE_ERROR from '@constants/firebaseErrors';
import { handleUpdateUserDataInAPI, handleUpdateUserStocksDataInAPI } from '@api/auth/loginAPI';
import type { Stocks } from '@constants/stocks/types';

import type { FormValues, AddTransactionFormProps, ApplyTransactionInfo } from './types';

const AddTransactionForm = ({ stocks, handleCloseModal }: AddTransactionFormProps) => {
	const [registrationError, setRegistrationError] = useState<string>('');
	const [transactionError, setTransactionError] = useState<string>('');
	const [transactionType, setTransactionType] = useState<string>('Buy');
	const [filteredStocks, setFilteredStocks] = useState<null | Stocks[]>(stocks);
	const balance = useAppSelector((store) => store.createUserSlice.user.balance);
	const user = useAppSelector((store) => store.createUserSlice.user);
	const userStocks = useAppSelector((store) => store.createUserSlice.user.userstocks);
	const stockBrokers = Array.from(new Set(filteredStocks?.map((data) => data.broker)));
	const [applyTransactionInfo, setApplyTransactionInfo] = useState<null | ApplyTransactionInfo>(null);
	const [confirmationTransactionStatus, setConfirmationTransactionStatus] = useState<boolean>(false);
	const [userPortfolioStocks, setUserPortfolioStocks] = useState<Stocks[] | null>([]);
	const [error, setError] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(false);
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
		const id = uuidv4();

		if (stock) {
			const newStock = {
				...stock,
				value: Number(data.stocksValue),
			};

			const result =
				transactionType === 'Buy'
					? Number((stock.price * Number(data.stocksValue) * (tax / 100) + stock.price * Number(data.stocksValue)).toFixed(1))
					: Number((stock.price * Number(data.stocksValue) - stock.price * Number(data.stocksValue) * (tax / 100)).toFixed(1));

			setApplyTransactionInfo({
				id: id,
				...data,
				stock: newStock ?? null,
				transactionDate: new Date(),
				result: stock ? result : 0,
				operationType: transactionType,
			});

			setConfirmationTransactionStatus(true);
		}
	};

	const handleConfirmTransaction = async () => {
		setLoading(true);

		if (applyTransactionInfo) {
			if (balance < applyTransactionInfo.result) {
				setTransactionError("You don't have enough money.Please top up balance!");
				setLoading(false);
				setConfirmationTransactionStatus(false);
			}

			if (filteredStocks && filteredStocks[0] && filteredStocks[0].value && transactionType !== 'Sell') {
				if (Number(applyTransactionInfo.stocksValue) > filteredStocks[0].value) {
					setTransactionError('Current value of stock is not enough for this transaction!');
					setLoading(false);
					setConfirmationTransactionStatus(false);
				}
			}

			if (transactionType === 'Buy') {
				const response = await handleAddUserTransactionAPI(user?.id, applyTransactionInfo);
				if (response && typeof response === 'string') {
					console.log(1);
				} else if (response && typeof response !== 'string') {
					const response = await handleUpdateUserDataInAPI(user?.id, user.balance - applyTransactionInfo.result);
					if (response && typeof response === 'string') {
						setRegistrationError(FIREBASE_ERROR[response]);
					} else if (response && typeof response !== 'string') {
						dispatch(
							updateUser({
								...user,
								balance: user.balance - applyTransactionInfo.result,
							})
						);

						const currentStock = applyTransactionInfo.stock;

						if (currentStock) {
							const response = await handleUpdateUserStocksDataInAPI(user?.id, currentStock, 'Buy');
							if (response && typeof response === 'string') {
								setRegistrationError(FIREBASE_ERROR[response]);
							} else if (response && typeof response !== 'string') {
								setLoading(false);
								setConfirmationTransactionStatus(false);
								handleCloseModal();
							}
						}
					}
				}
			}

			if (transactionType === 'Sell') {
				if (userPortfolioStocks) {
					const userPortfolioStock = userPortfolioStocks.find((stock) => stock.symbol === applyTransactionInfo.assets);

					if (userPortfolioStock) {
						if (userPortfolioStock.value < Number(applyTransactionInfo.stocksValue)) {
							setTransactionError('Current value of stock is not enough in your portfolio for this transaction!');
						} else {
							const response = await handleAddUserTransactionAPI(user?.id, applyTransactionInfo);
							if (response && typeof response === 'string') {
							} else if (response && typeof response !== 'string') {
								const response = await handleUpdateUserDataInAPI(user?.id, user.balance + applyTransactionInfo.result);
								if (response && typeof response === 'string') {
									setRegistrationError(FIREBASE_ERROR[response]);
								} else if (response && typeof response !== 'string') {
									dispatch(
										updateUser({
											...user,
											balance: user.balance + applyTransactionInfo.result,
										})
									);
									const currentStock = applyTransactionInfo.stock;

									if (currentStock) {
										const response = await handleUpdateUserStocksDataInAPI(user?.id, currentStock, 'Sell');

										if (response && typeof response === 'string') {
											setRegistrationError(FIREBASE_ERROR[response]);
										} else if (response && typeof response !== 'string') {
											setLoading(false);
											setConfirmationTransactionStatus(false);
											handleCloseModal();
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};

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

	useEffect(() => {
		const handleGetStocksDataFromDB = async () => {
			const response = await handleGetUserStocksDataInAPI(user?.id);

			if (!response) {
				setUserPortfolioStocks(null);
			}

			if (response && typeof response === 'string') {
				setError(response);
			} else if (response && typeof response !== 'string') {
				setUserPortfolioStocks(response);
			}
		};

		handleGetStocksDataFromDB();
	}, []);

	return (
		<Wrapper>
			{!isLoading ? (
				<>
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
					<TransactionErrorText>{transactionError}</TransactionErrorText>
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
						{!confirmationTransactionStatus ? (
							<Button width={180} height={40} bRadius={10} bgColor='#8F723A' onPress={handleSubmit(handleSubmitForm)}>
								<ButtonText>Apply transaction</ButtonText>
							</Button>
						) : (
							<Button width={180} height={40} bRadius={10} bgColor='#8F723A' onPress={handleConfirmTransaction}>
								<ButtonText>Confirm transaction</ButtonText>
							</Button>
						)}
					</ButtonWrapper>
				</>
			) : (
				<>
					<ActivityIndicator size='large' color='#8F723A' />
				</>
			)}
		</Wrapper>
	);
};

export default AddTransactionForm;
