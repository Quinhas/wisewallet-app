import {
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	FlexProps,
	Heading,
	Text,
	useDisclosure,
	useStyleConfig,
	useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { Pencil } from 'phosphor-react';
import { useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { formatCurrency } from 'utils/formatCurrency';
import { formatDate } from 'utils/formatDate';
import { errorToast } from 'utils/toastConfig';

interface CardTransactionProps {
	transaction: CardTransaction;
	showCardName?: boolean;
	variant?: string;
	colorScheme?: string;
	colorMode?: 'light' | 'dark';
}

export function CardStatementItem({
	transaction,
	showCardName = false,
	variant,
	colorScheme,
	colorMode,
	...rest
}: CardTransactionProps & FlexProps): JSX.Element {
	const styles = useStyleConfig('CardStatementItem', {
		variant,
		colorScheme,
		colorMode
	});

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
	const toast = useToast();
	const navigate = useNavigate();

	const details = useMemo(() => {
		return [
			{
				title: 'Date',
				value: format(new Date(transaction.date), 'P HH:mm', { locale: ptBR }),
				show: false
			},
			{
				title: 'Category',
				value: transaction.category?.description ?? '-',
				show: true
			},
			{
				title: 'Recurrent',
				value: transaction.isRecurrent ? 'Yes' : 'No',
				show: transaction.isRecurrent
			},
			{
				title: 'Installments',
				value: transaction.installments,
				show: transaction.isInstallment
			},
			{
				title: 'Charged Installments',
				value: transaction.chargedInstallments,
				show: transaction.isInstallment
			}
		];
	}, [transaction]);

	async function deleteTransaction(): Promise<void> {
		try {
			await wisewallet.cards.transactions.delete({ id: transaction.id });
			navigate(0);
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
				description: 'Could not delete transaction. Try again.'
			});
		}
	}

	return (
		<>
			<Flex
				as={AccordionItem}
				__css={styles}
				{...rest}
			>
				<AccordionButton className="button">
					<Flex
						direction="column"
						overflow="hidden"
						alignItems="start"
					>
						<Heading id="title">
							{transaction.title}{' '}
							{transaction.isInstallment &&
								`${transaction.chargedInstallments}/${transaction.installments}}`}
						</Heading>
						<Text id="subtitle">
							{showCardName && transaction.card?.name
								? transaction.card.name
								: format(new Date(transaction.date), 'HH:mm', { locale: ptBR })}
						</Text>
					</Flex>
					<Text id="value">
						{transaction.type === 'EXPENSE' ? '- ' : '+ '}
						{formatCurrency(transaction.value)}
					</Text>
				</AccordionButton>
				<AccordionPanel
					py="0.5rem"
					px="1rem"
					className="panel"
				>
					{details.map(
						(detail) =>
							detail.show && (
								<Flex
									key={detail.title}
									justifyContent="space-between"
									alignItems="center"
								>
									<Heading
										fontSize="0.875rem"
										fontWeight="500"
									>
										{detail.title}
									</Heading>
									<Text fontSize="0.875rem">{detail.value}</Text>
								</Flex>
							)
					)}

					<Flex
						justifyContent="start"
						alignItems="center"
						mt="1rem"
						gap="1rem"
					>
						<Button
							as={Link}
							to={transaction.id}
							colorScheme="primaryApp"
							size="sm"
							variant="outline"
							aria-label="Edit Transaction"
							leftIcon={<Pencil />}
							fontSize="1rem"
							lineHeight="1rem"
							w="50%"
							fontWeight={400}
						>
							Edit
						</Button>
						<Button
							colorScheme="danger"
							size="sm"
							variant="outline"
							aria-label="Delete Transaction"
							leftIcon={<Pencil />}
							fontSize="1rem"
							lineHeight="1rem"
							w="50%"
							fontWeight={400}
							onClick={onOpen}
						>
							Delete
						</Button>
					</Flex>
				</AccordionPanel>
			</Flex>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				motionPreset="slideInBottom"
			>
				<AlertDialogOverlay>
					<AlertDialogContent maxW="90%">
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold"
						>
							Delete Transaction
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text fontFamily="heading">
								{transaction.title}
								<br />
								{formatCurrency(transaction.value)} -{' '}
								{formatDate(transaction.date)}
							</Text>
							<Text mt="1rem">
								Are you sure? You can&apos;t undo this action afterwards.
							</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
								colorScheme="primaryApp"
							>
								Cancel
							</Button>
							<Button
								colorScheme="danger"
								onClick={deleteTransaction}
								ml={3}
								variant="outline"
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
