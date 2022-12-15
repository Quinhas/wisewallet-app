import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Heading,
	IconButton,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import { CardForm } from 'components/CardForm';
import { Loading } from 'components/Loading';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft, Trash } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

export function EditCardPage(): JSX.Element {
	const [card, setCard] = useState<CreditCard | undefined | null>();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const bgColor = useColorModeValue('white', 'black');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement | null>(null);
	const toast = useToast();

	async function onSubmit(data: CreditCardDTO): Promise<void> {
		try {
			if (!id) {
				throw new WisewalletApplicationException('Unable to find card ID.');
			}
			await wisewallet.cards.update({
				id,
				data
			});
			navigate('../');
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
				description: 'Could not update card. Try again.'
			});
		}
	}

	async function handleDelete(): Promise<void> {
		try {
			if (!id) {
				throw new WisewalletApplicationException('Unable to find card ID.');
			}
			await wisewallet.bankAccounts.delete({
				id
			});
			navigate('../../', { relative: 'path' });
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
				description: 'Could not delete card. Try again.'
			});
		}
	}

	const getData = useCallback(async (): Promise<void> => {
		setCard(undefined);
		try {
			if (!id) {
				throw new Error('ID is required.');
			}
			const data = await wisewallet.cards.getByID({ id });
			setCard(data);
		} catch (error) {
			setCard(null);
		}
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData]);

	if (card) {
		return (
			<>
				<Flex
					alignItems="center"
					m="1rem"
					gap="0.5rem"
				>
					<IconButton
						aria-label="Return to account"
						icon={<ArrowLeft />}
						size="xs"
						minHeight="2rem"
						minW="2rem"
						colorScheme="primaryApp"
						variant="outline"
						onClick={() => navigate('../', { relative: 'path' })}
					/>
					<Heading fontWeight={600}>Edit {card.name}</Heading>
				</Flex>
				<Flex
					justify="space-between"
					align="center"
					fontSize="1.5rem"
					mx="1rem"
					p="1rem"
					bg={bgColor}
					borderRadius="2xl"
					boxShadow="md"
				>
					<CardForm
						data={card}
						onFormSubmit={onSubmit}
					/>
				</Flex>
				<Flex
					m="1rem"
					justify="end"
					grow={1}
					align="end"
				>
					<IconButton
						aria-label={`Delete ${card.name}`}
						icon={<Trash />}
						colorScheme="danger"
						variant="outline"
						size="sm"
						onClick={onOpen}
					/>
				</Flex>
				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent
							maxW="calc(100vw - 2rem)"
							mx="1rem"
						>
							<AlertDialogHeader
								fontSize="lg"
								fontWeight="bold"
							>
								Delete {card.name}
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure? You can&apos;t undo this action afterwards.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									onClick={onClose}
									size="sm"
								>
									Cancel
								</Button>
								<Button
									colorScheme="danger"
									onClick={handleDelete}
									ms={3}
									size="sm"
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

	if (card === undefined) {
		return <Loading />;
	}

	return <Text>not found.</Text>;
}
