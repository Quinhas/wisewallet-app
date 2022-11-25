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
import { FloppyDisk } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';
import {
	invalidDateMessage,
	maxLengthMessage,
	requiredFieldMessage,
	sameAccountTransferMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface TransferFormProps {
	onFormSubmit: (data: FormFields) => void;
}

interface FormFields {
	from: string;
	to: string;
	description: string;
	value: number;
	date: string;
}

const ValidationSchema = yup.object().shape({
	from: yup.string().required(requiredFieldMessage),
	to: yup
		.string()
		.required(requiredFieldMessage)
		.not([yup.ref('from')], sameAccountTransferMessage),
	description: yup.string().max(150, maxLengthMessage('description', 150)),
	value: yup.number().required(requiredFieldMessage),
	date: yup.date().required(requiredFieldMessage).typeError(invalidDateMessage)
});

export function TransferForm({ onFormSubmit }: TransferFormProps): JSX.Element {
	const [bankAccounts, setBankAccounts] = useState<
		BankAccount[] | null | undefined
	>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<FormFields>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<FormFields> = (values, e): void => {
		e?.preventDefault();
		onFormSubmit(values);
	};

	const getBankAccounts = useCallback(async () => {
		setBankAccounts(undefined);
		try {
			const apiBankAccounts = await wisewallet.bankAccounts.getAll();
			const formattedBankAccounts: BankAccount[] = apiBankAccounts.map(
				(acc) => ({
					...acc,
					createdAt: formatDate(acc.createdAt),
					updatedAt: formatDate(acc.updatedAt),
					transactions: []
				})
			);
			setBankAccounts(formattedBankAccounts);
		} catch (error) {
			setBankAccounts(null);
		}
	}, []);

	useEffect(() => {
		getBankAccounts();
	}, [getBankAccounts]);

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
					isInvalid={!!errors.from}
					isRequired
				>
					<FormLabel htmlFor="from">From</FormLabel>
					<Select
						{...register('from')}
						defaultValue="-1"
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
					{errors.from && (
						<FormErrorMessage>{errors.from.message}</FormErrorMessage>
					)}
				</FormControl>
			)}

			{bankAccounts === null && <h1>erro.</h1>}
			{bankAccounts && bankAccounts.length === 0 && <h1>não tem contas.</h1>}
			{bankAccounts && bankAccounts.length !== 0 && (
				<FormControl
					isInvalid={!!errors.to}
					isRequired
				>
					<FormLabel htmlFor="to">To</FormLabel>
					<Select
						{...register('to')}
						defaultValue="-1"
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
					{errors.to && (
						<FormErrorMessage>{errors.to.message}</FormErrorMessage>
					)}
				</FormControl>
			)}

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
				Create
			</Button>
		</Flex>
	);
}
