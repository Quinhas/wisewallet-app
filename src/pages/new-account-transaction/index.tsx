import {
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { AccountTransactionForm } from 'components/AccountTransactionForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

export function NewAccountTransactionPage(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location as {
		state: {
			bankAccountId: string | undefined;
		} | null;
	};
	const toast = useToast();

	async function onSubmit(data: AccountTransactionDTO): Promise<void> {
		try {
			const newAccount = {
				bankAccountId: data.bankAccountId,
				date: data.date,
				title: data.title,
				type: data.type,
				value: Number(data.value),
				categoryId:
					data.categoryId && Number(data.categoryId) !== -1
						? Number(data.categoryId)
						: undefined,
				description: data.description,
				isRecurrent: data.isRecurrent
			};
			await wisewallet.bankAccounts.transactions.create({
				data: newAccount
			});
			navigate(state?.bankAccountId ? `/account/${state.bankAccountId}` : '/');
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				toast({
					...errorToast,
					description: error.message
				});
				return;
			}

			toast({
				...errorToast,
				description: 'Could not update bank account. Try again.'
			});
		}
	}

	return (
		<>
			<Flex
				alignItems="center"
				m="1rem"
				gap="0.5rem"
			>
				<IconButton
					aria-label="Return to home"
					icon={<ArrowLeft />}
					size="xs"
					minHeight="2rem"
					minW="2rem"
					colorScheme="primaryApp"
					variant="outline"
					onClick={() =>
						navigate(
							state?.bankAccountId ? `/account/${state.bankAccountId}` : '/'
						)
					}
				/>
				<Heading fontWeight={600}>New Transaction</Heading>
			</Flex>
			<Flex
				justify="space-between"
				align="center"
				fontSize="1.5rem"
				mb="0.5rem"
				mx="1rem"
				p="1rem"
				bg={useColorModeValue('white', 'black')}
				borderRadius="2xl"
				boxShadow="md"
			>
				<AccountTransactionForm
					data={{ bankAccountId: state?.bankAccountId }}
					onFormSubmit={onSubmit}
				/>
			</Flex>
		</>
	);
}
