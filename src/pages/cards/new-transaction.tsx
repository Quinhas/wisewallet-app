import {
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { CardTransactionForm } from 'components/CardTransactionForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { formatDateDB } from 'utils/formatDateDB';
import { errorToast } from 'utils/toastConfig';

export function NewCardTransactionPage(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location as {
		state: {
			selectedCard: string | undefined;
		} | null;
	};
	const toast = useToast();

	async function onSubmit(data: CardTransactionDTO): Promise<void> {
		try {
			const newTransaction = {
				cardId: data.cardId,
				date: formatDateDB(new Date(data.date)),
				title: data.title,
				type: data.type,
				value: Number(data.value),
				categoryId:
					data.categoryId && Number(data.categoryId) !== -1
						? Number(data.categoryId)
						: undefined,
				description: data.description,
				isRecurrent: data.isRecurrent ?? false,
				chargedInstallments: data.chargedInstallments,
				installments: data.installments,
				isInstallment: data.isInstallment ?? false
			};
			await wisewallet.cards.transactions.create({ data: newTransaction });
			navigate(state?.selectedCard ? `/cards/${state.selectedCard}` : '/');
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
					onClick={() =>
						navigate(state?.selectedCard ? `/cards/${state.selectedCard}` : '/')
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
				<CardTransactionForm
					selectedCard={state?.selectedCard}
					onFormSubmit={onSubmit}
				/>
			</Flex>
		</>
	);
}
