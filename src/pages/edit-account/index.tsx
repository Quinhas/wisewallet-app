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
	useDisclosure
} from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import { Loading } from 'components/Loading';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft, Trash } from 'phosphor-react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	BankAccount,
	BankAccountDTO
} from 'services/wisewalletService/bankAccountsService';

export function EditAccountPage(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const { updateBankAccount, deleteBankAccount } = useWisewallet();
	const { bankAccount } = location.state as { bankAccount: BankAccount };
	const bgColor = useColorModeValue('white', 'black');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement | null>(null);

	function onSubmit(data: BankAccountDTO): void {
		updateBankAccount({
			id: bankAccount.id,
			bankAccount: data
		});
		navigate(-1);
	}

	function handleDelete(): void {
		deleteBankAccount({
			id: bankAccount.id
		});
		navigate(-2);
	}

	if (bankAccount) {
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
						onClick={() => navigate(-1)}
					/>
					<Heading fontWeight={600}>Edit {bankAccount.name}</Heading>
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
					<AccountForm
						data={bankAccount}
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
						aria-label={`Delete ${bankAccount.name}`}
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
								Delete {bankAccount.name}
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

	if (bankAccount === undefined) {
		return <Loading />;
	}

	return <Text>not found.</Text>;
}
