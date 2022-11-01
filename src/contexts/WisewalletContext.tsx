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
	BankAccount,
	DeleteBankAccountParams,
	UpdateBankAccountParams
} from 'services/wisewalletService/bankAccountsService';
import { errorToast, successToast } from 'utils/toastConfig';

export interface WisewalletContextProps {
	bankAccounts: BankAccount[];
	balance: number;
	updateBankAccount: (data: UpdateBankAccountParams) => Promise<void>;
	deleteBankAccount: (data: DeleteBankAccountParams) => Promise<void>;
}

interface WisewalletContextProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const WisewalletContext = createContext({} as WisewalletContextProps);

export function WisewalletContextProvider({
	children
}: WisewalletContextProviderProps): JSX.Element {
	const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
	const [balance, setBalance] = useState(0);
	const toast = useToast();

	useEffect(() => {
		const balance = bankAccounts.reduce(
			(prevValue, currentValue) => prevValue + Number(currentValue.balance),
			0
		);
		setBalance(balance);
	}, [bankAccounts]);

	const getBankAccounts = useCallback(async () => {
		try {
			const data = await wisewallet.getAllBankAccounts();
			setBankAccounts(data);
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
				description: 'Could not get bank accounts. Try again.'
			});
		}
	}, [toast]);

	const updateBankAccount = useCallback(
		async ({ id, bankAccount }: UpdateBankAccountParams): Promise<void> => {
			try {
				await wisewallet.updateBankAccount({
					id,
					bankAccount
				});
				setBankAccounts((prevValue) => {
					const bankAccounts = prevValue.map<BankAccount>((acc) => {
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
				toast({
					...successToast,
					description: 'Bank Account updated successfully.'
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
					const bankAccounts = prevValue.filter((acc) => acc.id !== id);
					return bankAccounts;
				});
				toast({
					...successToast,
					description: 'Bank Account deleted successfully.'
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

	useEffect(() => {
		getBankAccounts();
	}, [getBankAccounts]);

	const value = useMemo(
		() => ({
			bankAccounts,
			balance,
			updateBankAccount,
			deleteBankAccount
		}),
		[bankAccounts, balance, updateBankAccount, deleteBankAccount]
	);

	return (
		<WisewalletContext.Provider value={value}>
			{children}
		</WisewalletContext.Provider>
	);
}
