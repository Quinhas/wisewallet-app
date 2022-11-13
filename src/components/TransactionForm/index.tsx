/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Textarea
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWisewallet } from 'hooks/useWisewallet';
import { FloppyDisk } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	AccountTransaction,
	AccountTransactionDTO
} from 'services/wisewalletService/bankAccountsService';
import { Category } from 'services/wisewalletService/categoryService';
import {
	invalidDateMessage,
	maxLengthMessage,
	requiredFieldMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface TransactionFormProps {
	data?: Partial<AccountTransaction>;
	onFormSubmit: (data: AccountTransactionDTO) => void;
}

const ValidationSchema = yup.object().shape({
	bankAccountId: yup.string().required(requiredFieldMessage),
	type: yup.string().required(requiredFieldMessage),
	title: yup
		.string()
		.required(requiredFieldMessage)
		.max(60, maxLengthMessage('title', 60)),
	description: yup.string().max(150, maxLengthMessage('description', 150)),
	value: yup.number().required(requiredFieldMessage),
	date: yup.date().required(requiredFieldMessage).typeError(invalidDateMessage),
	categoryId: yup.number()
});

export function TransactionForm({
	data,
	onFormSubmit
}: TransactionFormProps): JSX.Element {
	const [categories, setCategories] = useState<Category[] | null>([]);
	const { bankAccounts, getCategories } = useWisewallet();
	const {
		register,
		handleSubmit,
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
		<Flex
			as="form"
			gridRowGap="1rem"
			direction="column"
			w="100%"
			onSubmit={handleSubmit(onSubmit)}
		>
			{bankAccounts === null && <h1>erro.</h1>}
			{bankAccounts && bankAccounts.length === 0 && <h1>não tem contas.</h1>}
			{bankAccounts && bankAccounts.length !== 0 && (
				<FormControl
					isInvalid={!!errors.bankAccountId}
					isRequired
				>
					<FormLabel htmlFor="bankAccountId">Bank Account</FormLabel>
					<Select
						defaultValue={data?.bankAccountId ?? '-1'}
						{...register('bankAccountId')}
					>
						<option
							value="-1"
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
					{errors.bankAccountId && (
						<FormErrorMessage>{errors.bankAccountId.message}</FormErrorMessage>
					)}
				</FormControl>
			)}

			<FormControl
				isInvalid={!!errors.type}
				isRequired
			>
				<FormLabel htmlFor="type">Type</FormLabel>
				<Select {...register('type')}>
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
				<Input
					placeholder="Value"
					type="number"
					{...register('value')}
				/>
				{errors.value && (
					<FormErrorMessage>{errors.value.message}</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.date}>
				<FormLabel htmlFor="balance">Date</FormLabel>
				<Input
					placeholder="Date"
					type="date"
					{...register('date')}
				/>
				{errors.date && (
					<FormErrorMessage>{errors.date.message}</FormErrorMessage>
				)}
			</FormControl>

			{categories === null && <h1>erro.</h1>}
			{categories && (
				<FormControl isInvalid={!!errors.categoryId}>
					<FormLabel htmlFor="balance">Category</FormLabel>
					<Select {...register('categoryId')}>
						<option
							value="-1"
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
					{errors.categoryId && (
						<FormErrorMessage>{errors.categoryId.message}</FormErrorMessage>
					)}
				</FormControl>
			)}

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
	);
}
