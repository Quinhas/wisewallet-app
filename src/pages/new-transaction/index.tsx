import { Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { TransactionForm } from 'components/TransactionForm';
import { parseISO } from 'date-fns';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountTransactionDTO } from 'services/wisewalletService/bankAccountsService';

export function NewTransactionPage(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const { createAccountTransaction } = useWisewallet();
	const { state } = location as {
		state: {
			bankAccountId: string | undefined;
		} | null;
	};

	async function onSubmit(data: AccountTransactionDTO): Promise<void> {
		await createAccountTransaction({
			accountTransaction: {
				bankAccountId: data.bankAccountId,
				date: parseISO(String(data.date)),
				title: data.title,
				type: data.type,
				value: Number(data.value),
				categoryId: data.categoryId && Number(data.categoryId) !== -1 ? Number(data.categoryId) : undefined,
				description: data.description,
				isRecurrent: data.isRecurrent
			}
		});
		navigate(state?.bankAccountId ? `/account/${state.bankAccountId}` : '/');
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
				<TransactionForm
					data={{ bankAccountId: state?.bankAccountId }}
					onFormSubmit={onSubmit}
				/>
			</Flex>
		</>
	);
}
