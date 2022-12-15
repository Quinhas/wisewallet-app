import {
	Flex,
	Heading,
	IconButton,
	useColorMode,
	useToast
} from '@chakra-ui/react';
import { CardTransactionForm } from 'components/CardTransactionForm';
import { Loading } from 'components/Loading';
import { format } from 'date-fns/esm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { formatDateDB } from 'utils/formatDateDB';
import { errorToast } from 'utils/toastConfig';

export function CardTransactionPage(): JSX.Element {
	const [transaction, setTransaction] = useState<
		CardTransaction | undefined | null
	>(undefined);
	const navigate = useNavigate();
	const { transactionId } = useParams();
	const toast = useToast();
	const { colorMode } = useColorMode();

	const getData = useCallback(async () => {
		setTransaction(undefined);
		try {
			if (!transactionId) {
				throw new Error('ID is required.');
			}
			const data = await wisewallet.cards.transactions.getByID({
				id: transactionId
			});
			const transaction = {
				...data,
				date: format(new Date(data.date), 'yyyy-LL-dd'),
				value: Number(data.value)
			};
			setTransaction(transaction);
		} catch (error) {
			setTransaction(null);
		}
	}, [transactionId]);

	useEffect(() => {
		getData();
	}, [getData]);

	if (transaction === undefined) {
		return <Loading />;
	}

	if (transaction === null) {
		return <h1>error</h1>;
	}

	async function onSubmit(data: CardTransactionDTO): Promise<void> {
		try {
			if (!transactionId) {
				throw new WisewalletApplicationException('Cannot find transaction id.');
			}
			const updatedTransaction = {
				cardId: data.cardId,
				title: data.title,
				date: formatDateDB(new Date(data.date)),
				type: data.type,
				value: Number(data.value),
				categoryId:
					data.categoryId && Number(data.categoryId) !== -1
						? Number(data.categoryId)
						: undefined,
				description: data.description,
				isRecurrent: data.isRecurrent ?? false,
				installments: data.installments,
				isInstallment: data.isInstallment ?? false
			};
			await wisewallet.cards.transactions.update({
				id: transactionId,
				data: updatedTransaction
			});
			navigate('../', { relative: 'path' });
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
				description: 'Could not create card transaction. Try again.'
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
					onClick={() => navigate('../', { relative: 'path' })}
				/>
				<Heading fontWeight={600}>Edit Transaction</Heading>
			</Flex>
			<Flex
				justify="space-between"
				align="center"
				fontSize="1.5rem"
				mb="0.5rem"
				mx="1rem"
				p="1rem"
				bg={colorMode === 'light' ? 'white' : 'black'}
				borderRadius="2xl"
				boxShadow="md"
			>
				<CardTransactionForm
					data={transaction}
					selectedCard={transaction.cardId}
					onFormSubmit={onSubmit}
				/>
			</Flex>
		</>
	);
}
