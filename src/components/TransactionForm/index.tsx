import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputLeftAddon,
	Select,
	Text,
	Textarea,
	useDisclosure
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountFormModal from 'components/AccountFormModal';
import CategoryFormModal from 'components/CategoryFormModal';
import { useWisewallet } from 'hooks/useWisewallet';
import { FloppyDisk, Plus } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	AccountTransaction,
	AccountTransactionDTO
} from 'services/wisewalletService/bankAccountsService';
import { Category } from 'services/wisewalletService/categoryService';
import {
	insufficientBalanceMessage,
	invalidDateMessage,
	maxLengthMessage,
	requiredFieldMessage,
	valueGreaterThanZeroMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface TransactionFormProps {
	data?: Partial<AccountTransaction>;
	onFormSubmit: (data: AccountTransactionDTO) => void;
}

export function TransactionForm({
	data,
	onFormSubmit
}: TransactionFormProps): JSX.Element {
	const [categories, setCategories] = useState<Category[] | null>([]);
	const [selectedBankAccount, setSelectedBankAccount] = useState<string>();
	const [showAvailableBalance, setShowAvailableBalance] = useState(false);
	const [transactionValue, setTransactionValue] = useState<string>('0');
	const { bankAccounts, getCategories, getBankAccounts } = useWisewallet();

	const getMaxBalance = useCallback<
		() => { value: number; formattedValue: string }
	>(() => {
		if (!bankAccounts || !selectedBankAccount) {
			return {
				value: 0,
				formattedValue: Number(0).toLocaleString('pt-BR', {
					currency: 'BRL',
					style: 'currency'
				})
			};
		}
		const maxBalance =
			bankAccounts.find((acc) => acc.id === selectedBankAccount)?.balance ?? 0;
		return {
			value: Number(maxBalance),
			formattedValue: Number(maxBalance).toLocaleString('pt-BR', {
				currency: 'BRL',
				style: 'currency'
			})
		};
	}, [bankAccounts, selectedBankAccount]);

	const ValidationSchema = yup.object().shape({
		bankAccountId: yup.string().required(requiredFieldMessage),
		type: yup.string().required(requiredFieldMessage),
		title: yup
			.string()
			.required(requiredFieldMessage)
			.max(60, maxLengthMessage('title', 60)),
		description: yup.string().max(150, maxLengthMessage('description', 150)),
		value: yup
			.number()
			.required(requiredFieldMessage)
			.typeError(requiredFieldMessage)
			.when('type', {
				is: 'EXPENSE',
				then: (schema) =>
					schema.max(getMaxBalance().value, insufficientBalanceMessage)
			})
			.min(0.01, valueGreaterThanZeroMessage),
		date: yup
			.date()
			.required(requiredFieldMessage)
			.typeError(invalidDateMessage),
		categoryId: yup.number()
	});

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<AccountTransactionDTO>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange',
		defaultValues: {
			bankAccountId: data?.bankAccountId,
			type: data?.type,
			title: data?.title ?? '',
			value: data?.value ?? 0,
			date: data?.date ?? new Date(),
			categoryId: data?.categoryId,
			description: data?.description ?? ''
		}
	});

	const {
		isOpen: isOpenAccountModal,
		onOpen: onOpenAccountModal,
		onClose: onCloseAccountModal
	} = useDisclosure();

	const {
		isOpen: isOpenCategoryModal,
		onOpen: onOpenCategoryModal,
		onClose: onCloseCategoryModal
	} = useDisclosure();

	const getData = useCallback(async () => {
		const dataCategories = await getCategories();
		setCategories(dataCategories);
	}, [getCategories]);

	useEffect(() => {
		getData();
	}, [getData]);

	const onSubmit: SubmitHandler<AccountTransactionDTO> = (values, e): void => {
		e?.preventDefault();
		onFormSubmit(values);
	};

	return (
		<>
			<Flex
				as="form"
				gridRowGap="1rem"
				direction="column"
				w="100%"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl
					isInvalid={!!errors.bankAccountId}
					isRequired
				>
					<FormLabel htmlFor="bankAccountId">Bank Account</FormLabel>
					{bankAccounts === null && (
						<Flex
							justify="space-between"
							align="center"
						>
							<Text fontSize="1rem">
								We couldn&apos;t find your bank accounts.
							</Text>
							<Button
								onClick={getBankAccounts}
								size="sm"
								colorScheme="primaryApp"
							>
								Try again.
							</Button>
						</Flex>
					)}
					{bankAccounts && bankAccounts.length === 0 && (
						<Flex
							justify="space-between"
							align="center"
						>
							<Text fontSize="1rem">No account found.</Text>
							<Button
								onClick={onOpenAccountModal}
								size="sm"
								colorScheme="primaryApp"
							>
								Create
							</Button>
						</Flex>
					)}
					{bankAccounts && bankAccounts.length !== 0 && (
						<Flex gap="0.5rem">
							<Select
								defaultValue={data?.bankAccountId ?? -1}
								{...register('bankAccountId', {
									onChange: () => {
										setSelectedBankAccount(getValues('bankAccountId'));
									}
								})}
							>
								<option
									value={-1}
									hidden
									disabled
								>
									Select
								</option>
								{bankAccounts.map((acc) => {
									return (
										<option
											key={acc.id}
											value={acc.id}
										>
											{acc.name}
										</option>
									);
								})}
							</Select>
							<IconButton
								aria-label="Create a new account"
								onClick={onOpenAccountModal}
								colorScheme="primaryApp"
								icon={<Plus />}
							/>
						</Flex>
					)}
					{errors.bankAccountId && (
						<FormErrorMessage>{errors.bankAccountId.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl
					isInvalid={!!errors.type}
					isRequired
				>
					<FormLabel htmlFor="type">Type</FormLabel>
					<Select
						{...register('type', {
							onChange: () =>
								setShowAvailableBalance(getValues('type') === 'EXPENSE')
						})}
						defaultValue={-1}
					>
						<option
							value="-1"
							hidden
							disabled
						>
							Select
						</option>
						<option value="INCOME">Income</option>
						<option value="EXPENSE">Expense</option>
					</Select>
					{errors.type && (
						<FormErrorMessage>{errors.type.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl
					isInvalid={!!errors.title}
					isRequired
				>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						placeholder="Title"
						type="text"
						{...register('title')}
						maxLength={60}
					/>
					{errors.title && (
						<FormErrorMessage>{errors.title.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl
					isInvalid={!!errors.value}
					isRequired
				>
					<FormLabel htmlFor="value">Value</FormLabel>
					<InputGroup>
						<InputLeftAddon
							height="auto"
							background="primaryApp.50"
							borderRight={0}
						>
							<Text
								fontFamily="heading"
								fontSize="1.25rem"
								fontWeight={300}
							>
								R$
							</Text>
						</InputLeftAddon>
						<Input
							placeholder="Value"
							min={0.01}
							type="text"
							inputMode="decimal"
							value={transactionValue}
							onChange={(e) => {
								const { value } = e.target;
								const parts = value.split(',');
								let [formattedValue] = parts;
								formattedValue = formattedValue
									.replace(/^0+/g, '')
									.replace(/[^0-9,.]/g, '')
									.replace(/\./g, '')
									.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
								formattedValue =
									parts[1] || parts[1] === ''
										? formattedValue.concat(
											',',
											parts[1].replace(/[^0-9]/g, '')
										)
										: formattedValue;
								const fixedValue = formattedValue.match(
									/^[0-9.]+(?:,[0-9.]{0,2})?/
								);
								formattedValue = fixedValue?.[0] ?? '0';
								const numberValue = Number(
									formattedValue.replace(/\./g, '').replace(',', '.')
								);
								setValue('value', Number.isNaN(numberValue) ? 0 : numberValue, {
									shouldValidate: true
								});

								setTransactionValue(formattedValue);
							}}
						/>
					</InputGroup>
					<Input
						display="none"
						placeholder="Value"
						min={0.01}
						type="number"
						{...register('value')}
					/>
					{showAvailableBalance && (
						<FormHelperText>
							Available: {getMaxBalance().formattedValue}
						</FormHelperText>
					)}

					{errors.value && (
						<FormErrorMessage>{errors.value.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl isInvalid={!!errors.date}>
					<FormLabel htmlFor="balance">Date</FormLabel>
					<Input
						placeholder="Date"
						type="date"
						{...register('date', { valueAsDate: true })}
					/>
					{errors.date && (
						<FormErrorMessage>{errors.date.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl isInvalid={!!errors.categoryId}>
					<FormLabel htmlFor="balance">Category</FormLabel>
					{categories === null && (
						<Flex
							justify="space-between"
							align="center"
						>
							<Text fontSize="1rem">
								We couldn&apos;t find your categories.
							</Text>
							<Button
								onClick={getCategories}
								size="sm"
								colorScheme="primaryApp"
							>
								Try again.
							</Button>
						</Flex>
					)}
					{categories && (
						<Flex gap="0.5rem">
							<Select
								{...register('categoryId')}
								defaultValue={-1}
							>
								<option
									value={-1}
									hidden
									disabled
								>
									Select
								</option>
								{categories.map((category) => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.description}
									</option>
								))}
							</Select>
							<IconButton
								aria-label="Create a new category"
								onClick={onOpenCategoryModal}
								colorScheme="primaryApp"
								icon={<Plus />}
							/>
						</Flex>
					)}
					{errors.categoryId && (
						<FormErrorMessage>{errors.categoryId.message}</FormErrorMessage>
					)}
				</FormControl>

				<FormControl isInvalid={!!errors.description}>
					<FormLabel htmlFor="description">Description</FormLabel>
					<Textarea
						placeholder="Description"
						{...register('description')}
						maxLength={150}
					/>
					{errors.description && (
						<FormErrorMessage>{errors.description.message}</FormErrorMessage>
					)}
				</FormControl>

				<Button
					colorScheme="primaryApp"
					isLoading={isSubmitting}
					isDisabled={isDirty ? !isValid : true}
					type="submit"
					leftIcon={<FloppyDisk />}
				>
					{!data ? 'Create' : 'Save'}
				</Button>
			</Flex>
			<AccountFormModal
				isOpen={isOpenAccountModal}
				onClose={onCloseAccountModal}
			/>
			<CategoryFormModal
				isOpen={isOpenCategoryModal}
				onClose={() => {
					getData();
					onCloseCategoryModal();
				}}
			/>
		</>
	);
}
