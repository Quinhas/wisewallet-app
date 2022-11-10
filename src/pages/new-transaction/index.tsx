/* eslint-disable @typescript-eslint/no-misused-promises */
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { TransactionForm } from 'components/TransactionForm';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountTransactionDTO } from 'services/wisewalletService/bankAccountsService';

export function NewTransactionPage(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const { createTransaction } = useWisewallet();
	const { bankAccountId } = location.state as { bankAccountId: string };

	async function onSubmit(data: AccountTransactionDTO): Promise<void> {
		await createTransaction({
			accountTransaction: {
				bankAccountId: data.bankAccountId,
				date: data.date,
				title: data.title,
				type: data.type,
				value: Number(data.value),
				categoryId: data.categoryId ? Number(data.categoryId) : undefined,
				description: data.description,
				isRecurrent: data.isRecurrent
			}
		});
		navigate(-1);
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
					onClick={() => navigate(-1)}
				/>
				<Heading fontWeight={600}>New Transaction</Heading>
			</Flex>
			<Flex
				justify="space-between"
				align="center"
				fontSize="1.5rem"
				mx="1rem"
				p="1rem"
				bg="white"
				borderRadius="2xl"
				boxShadow="md"
			>
				<TransactionForm
					data={{ bankAccountId }}
					onFormSubmit={onSubmit}
				/>
			</Flex>
		</>
	);
}
