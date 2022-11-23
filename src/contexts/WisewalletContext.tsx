/* eslint-disable @typescript-eslint/no-shadow */
import { useToast } from '@chakra-ui/react';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
import { wisewallet } from 'services/wisewalletService';
import {
	AccountTransaction,
	BankAccount,
	CreateAccountTransactionParams,
	CreateBankAccountParams,
	DeleteBankAccountParams,
	GetBankAccountByIDParams,
	UpdateBankAccountParams
} from 'services/wisewalletService/bankAccountsService';
import {
	Category,
	CreateCategoryParams
} from 'services/wisewalletService/categoryService';
import { errorToast } from 'utils/toastConfig';

export interface WisewalletContextProps {
	bankAccounts: BankAccount[] | undefined | null;
	balance: number;
	getBankAccounts: () => Promise<BankAccount[] | null>;
	getBankAccount: (
		data: GetBankAccountByIDParams
	) => Promise<BankAccount | null>;
	createBankAccount: (
		data: CreateBankAccountParams
	) => Promise<BankAccount | null>;
	updateBankAccount: (data: UpdateBankAccountParams) => Promise<void>;
	deleteBankAccount: (data: DeleteBankAccountParams) => Promise<void>;
	getCategories: () => Promise<Category[] | null>;
	createCategory: (data: CreateCategoryParams) => Promise<Category | null>;
	getAllAccountTransactions: () => Promise<AccountTransaction[] | null>;
	createAccountTransaction: (
		data: CreateAccountTransactionParams
	) => Promise<AccountTransaction | null>;
}

interface WisewalletContextProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const WisewalletContext = createContext({} as WisewalletContextProps);

export function WisewalletContextProvider({
	children
}: WisewalletContextProviderProps): JSX.Element {
	const [bankAccounts, setBankAccounts] = useState<
		BankAccount[] | undefined | null
	>(undefined);
	const [balance, setBalance] = useState(0);
	const toast = useToast();

	useEffect(() => {
		if (!bankAccounts) {
			setBalance(0);
			return;
		}

		const balance = bankAccounts.reduce(
			(prevValue, currentValue) => prevValue + Number(currentValue.balance),
			0
		);
		setBalance(balance);
	}, [bankAccounts]);

	const getBankAccounts = useCallback(async (): Promise<
		BankAccount[] | null
	> => {
		setBankAccounts(undefined);
		try {
			const data = await wisewallet.getAllBankAccounts();
			setBankAccounts(data);
			return data;
		} catch (error) {
			setBankAccounts(null);
			if (error instanceof WisewalletApplicationException) {
				if (error.errors?.length !== 0) {
					error.errors?.forEach((err) => {
						toast({
							...errorToast,
							description: err.message
						});
					});
					return null;
				}
			}

			toast({
				...errorToast,
				description: 'Could not get bank accounts. Try again.'
			});
		}

		return null;
	}, [toast]);

	const getBankAccount = useCallback(
		async ({ id }: GetBankAccountByIDParams): Promise<BankAccount | null> => {
			try {
				const data = await wisewallet.getBankAccountByID({ id });
				return data;
			} catch (error) {
				if (error instanceof WisewalletApplicationException) {
					if (error.errors?.length !== 0) {
						error.errors?.forEach((err) => {
							toast({
								...errorToast,
								description: err.message
							});
						});
						return null;
					}
				}

				toast({
					...errorToast,
					description: 'Could not get bank accounts. Try again.'
				});
			}

			return null;
		},
		[toast]
	);

	const createBankAccount = useCallback(
		async ({
			bankAccount
		}: CreateBankAccountParams): Promise<BankAccount | null> => {
			try {
				const data = await wisewallet.createBankAccount({
					bankAccount
				});
				setBankAccounts((prevValue) => {
					if (prevValue) {
						return [...prevValue, data];
					}

					return prevValue;
				});
			} catch (error) {
				if (error instanceof WisewalletApplicationException) {
					if (error.errors?.length !== 0) {
						error.errors?.forEach((err) => {
							toast({
								...errorToast,
								description: err.message
							});
						});
						return null;
					}
				}

				toast({
					...errorToast,
					description: 'Could not continue. Try again.'
				});
			}
			return null;
		},
		[toast]
	);

	const updateBankAccount = useCallback(
		async ({ id, bankAccount }: UpdateBankAccountParams): Promise<void> => {
			try {
				await wisewallet.updateBankAccount({
					id,
					bankAccount
				});
				setBankAccounts((prevValue) => {
					const bankAccounts = prevValue!.map<BankAccount>((acc) => {
						if (acc.id === id) {
							return {
								...acc,
								...bankAccount,
								updatedAt: new Date()
							};
						}

						return acc;
					});
					return bankAccounts;
				});
			} catch (error) {
				if (error instanceof WisewalletApplicationException) {
					if (error.errors?.length !== 0) {
						error.errors?.forEach((err) => {
							toast({
								...errorToast,
								description: err.message
							});
						});
						return;
					}
				}

				toast({
					...errorToast,
					description: 'Could not continue. Try again.'
				});
			}
		},
		[toast]
	);

	const deleteBankAccount = useCallback(
		async ({ id }: DeleteBankAccountParams): Promise<void> => {
			try {
				await wisewallet.deleteBankAccount({
					id
				});
				setBankAccounts((prevValue) => {
					const bankAccounts = prevValue!.filter((acc) => acc.id !== id);
					return bankAccounts;
				});
			} catch (error) {
				if (error instanceof WisewalletApplicationException) {
					if (error.errors?.length !== 0) {
						error.errors?.forEach((err) => {
							toast({
								...errorToast,
								description: err.message
							});
						});
						return;
					}
				}

				toast({
					...errorToast,
					description: 'Could not continue. Try again.'
				});
			}
		},
		[toast]
	);

	const getAllAccountTransactions = useCallback(async (): Promise<AccountTransaction[] | null> => {
		try {
			const data = await wisewallet.transactions.getAll();
			return data;
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				if (error.errors?.length !== 0) {
					error.errors?.forEach((err) => {
						toast({
							...errorToast,
							description: err.message
						});
					});
					return null;
				}
			}

			toast({
				...errorToast,
				description: 'Could not create transaction. Try again.'
			});
		}

		return null;
	}, [toast])

	const createAccountTransaction = useCallback(
		async ({
			accountTransaction
		}: CreateAccountTransactionParams): Promise<AccountTransaction | null> => {
			try {
				const data = await wisewallet.transactions.create({
					accountTransaction
				});
				setBankAccounts((prevValue) => {
					const bankAccounts = prevValue!.map<BankAccount>((acc) => {
						if (acc.id === accountTransaction.bankAccountId) {
							return {
								...acc,
								balance:
									accountTransaction.type === 'INCOME'
										? Number(acc.balance) + Number(accountTransaction.value)
										: Number(acc.balance) - Number(accountTransaction.value)
							};
						}

						return acc;
					});
					return bankAccounts;
				});
				return data;
			} catch (error) {
				if (error instanceof WisewalletApplicationException) {
					if (error.errors?.length !== 0) {
						error.errors?.forEach((err) => {
							toast({
								...errorToast,
								description: err.message
							});
						});
						return null;
					}
				}

				toast({
					...errorToast,
					description: 'Could not create transaction. Try again.'
				});
			}

			return null;
		},
		[toast]
	);

	const getCategories = useCallback(async (): Promise<Category[] | null> => {
		try {
			const data = await wisewallet.getAllCategories();
			return data;
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				if (error.errors?.length !== 0) {
					error.errors?.forEach((err) => {
						toast({
							...errorToast,
							description: err.message
						});
					});
					return null;
				}
			}

			toast({
				...errorToast,
				description: 'Could not get categories. Try again.'
			});
		}

		return null;
	}, [toast]);

	const createCategory = useCallback(
		async ({ category }: CreateCategoryParams): Promise<Category | null> => {
			try {
				const data = await wisewallet.createCategory({ category });
				return data;
			} catch (error) {
				return null;
			}
		},
		[]
	);

	useEffect(() => {
		getBankAccounts();
	}, [getBankAccounts]);

	const value = useMemo(
		() => ({
			bankAccounts,
			balance,
			getBankAccounts,
			getBankAccount,
			createBankAccount,
			updateBankAccount,
			deleteBankAccount,
			getCategories,
			createCategory,
			getAllAccountTransactions,
			createAccountTransaction,
		}),
		[
			bankAccounts,
			balance,
			getBankAccounts,
			getBankAccount,
			createBankAccount,
			updateBankAccount,
			deleteBankAccount,
			getCategories,
			createCategory,
			getAllAccountTransactions,
			createAccountTransaction,
		]
	);

	return (
		<WisewalletContext.Provider value={value}>
			{children}
		</WisewalletContext.Provider>
	);
}
