import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWisewallet } from 'hooks/useWisewallet';
import { FloppyDisk, Trash } from 'phosphor-react';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BankAccountDTO } from 'services/wisewalletService/bankAccountsService';
import * as yup from 'yup';

interface AccountModalProps {
	type?: 'Cash' | 'Bank' | 'Others';
	value?: number;
	name?: string;
	id?: string;
	isOpen: boolean;
	onClose: () => void;
}

interface FormFields {
	type: string;
	name: string;
	balance: number;
}

export default function AccountModal({
	type,
	name,
	value,
	id,
	isOpen,
	onClose
}: AccountModalProps): JSX.Element {
	const {
		isOpen: isOpenConfirm,
		onOpen: onOpenConfirm,
		onClose: onCloseConfirm
	} = useDisclosure();
	const cancelRef = useRef(null);
	const { updateBankAccount, deleteBankAccount } = useWisewallet();

	const ValidationSchema = yup.object().shape({
		type: yup.string().required('Required field.'),
		name: yup.string(),
		balance: yup.number().required('Required field.')
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid }
	} = useForm<FormFields>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange',
		defaultValues: {
			type: type ?? 'Type',
			name: name ?? '',
			balance: value ?? 0
		}
	});

	const onSubmit: SubmitHandler<FormFields> = (values, e): void => {
		e?.preventDefault();
		if (id) {
			const bankAccount: BankAccountDTO = {
				name: values.name,
				balance: values.balance
			};
			updateBankAccount({ id, bankAccount });
			onClose();
		}
	};

	const handleDelete = (): void => {
		if (id) {
			deleteBankAccount({ id });
			onClose();
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				motionPreset="slideInBottom"
			>
				<ModalOverlay backdropFilter="blur(0.15rem)" />
				<ModalContent
					mx="1rem"
					maxW="calc(100vw - 1rem)"
				>
					<ModalHeader>
						{id && 'Edit'}
						{!id && 'New'} account
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex
							as="form"
							gridRowGap="1rem"
							direction="column"
							w="100%"
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onSubmit={handleSubmit(onSubmit)}
						>
							<FormControl
								isInvalid={!!errors.type}
								isRequired
							>
								<FormLabel htmlFor="type">Type</FormLabel>
								<Select {...register('type')}>
									<option
										value="Type"
										hidden
										disabled
									>
										Selecionar
									</option>
									<option value="Cash">Cash</option>
									<option value="Bank">Bank Account</option>
									<option value="Others">Others</option>
								</Select>
								{errors.type && (
									<FormErrorMessage>{errors.type.message}</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={!!errors.name}>
								<FormLabel htmlFor="name">Name</FormLabel>
								<Input
									placeholder="Name"
									type="text"
									{...register('name')}
								/>
								{errors.name && (
									<FormErrorMessage>{errors.name.message}</FormErrorMessage>
								)}
							</FormControl>
							<FormControl
								isInvalid={!!errors.balance}
								isRequired
							>
								<FormLabel htmlFor="balance">Balance</FormLabel>
								<Input
									placeholder="Balance"
									autoComplete="off"
									step={0.01}
									type="number"
									{...register('balance')}
								/>
								{errors.balance && (
									<FormErrorMessage>{errors.balance.message}</FormErrorMessage>
								)}
							</FormControl>
							<Flex
								py="1rem"
								gridGap="0.5rem"
								px={0}
								grow={1}
							>
								{id && (
									<Flex>
										<Button
											colorScheme="danger"
											variant="outline"
											leftIcon={<Trash />}
											onClick={onOpenConfirm}
										>
											Delete
										</Button>
									</Flex>
								)}
								<Flex
									ms="auto"
									gap="1rem"
								>
									<Button
										onClick={onClose}
										variant="outline"
									>
										{id && 'Cancel'}
										{!id && 'Return'}
									</Button>
									<Button
										colorScheme="primaryApp"
										isLoading={isSubmitting}
										isDisabled={!isValid}
										type="submit"
										leftIcon={<FloppyDisk />}
									>
										{id && 'Save'}
										{!id && 'Create'}
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<AlertDialog
				isOpen={isOpenConfirm}
				leastDestructiveRef={cancelRef}
				onClose={onCloseConfirm}
			>
				<AlertDialogOverlay backdropFilter="blur(0.15rem)">
					<AlertDialogContent
						mx="1rem"
						maxW="calc(100vw - 1rem)"
					>
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold"
						>
							Delete account
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You cannot undo this action later.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onCloseConfirm}
								variant="outline"
							>
								Cancel
							</Button>
							<Button
								colorScheme="danger"
								onClick={handleDelete}
								ml={3}
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
