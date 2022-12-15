import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
	Textarea,
	useColorMode
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CardSelect } from 'components/CardSelect';
import { CategorySelect } from 'components/CategorySelect';
import { format } from 'date-fns';
import { FloppyDisk } from 'phosphor-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { currencyToNumber } from 'utils/currencyToNumber';
import { formatCurrency } from 'utils/formatCurrency';
import { formatDateDB } from 'utils/formatDateDB';
import {
	invalidDateMessage,
	invalidValueMessage,
	maxLengthMessage,
	requiredFieldMessage,
	valueGreaterThanMessage
} from 'utils/formValidationMessages';
import { Replace } from 'utils/Replace';
import * as yup from 'yup';

type CardTransactionFormFields = Replace<
	CardTransactionDTO,
	{ date: string }
> & { isRefund: boolean };

interface CardTransactionFormProps {
	data?: Partial<CardTransaction>;
	onFormSubmit: (data: CardTransactionDTO) => void;
	selectedCard?: string;
}

export function CardTransactionForm({
	data,
	onFormSubmit,
	selectedCard
}: CardTransactionFormProps): JSX.Element {
	const [isRefund, setIsRefund] = useState(data?.type === 'INCOME' ?? false);
	const [isInstallment, setIsInstallment] = useState(
		data?.isInstallment ?? false
	);
	const [installments, setInstallments] = useState(data?.installments ?? 1);
	const [transactionValue, setTransactionValue] = useState(data?.value ?? 0);
	const { colorMode } = useColorMode();

	const installmentText = useMemo((): string | undefined => {
		if (isRefund) {
			return undefined;
		}

		if (!isInstallment) {
			return undefined;
		}

		return `${installments}x ${formatCurrency(
			transactionValue / installments
		)}`;
	}, [transactionValue, isInstallment, installments, isRefund]);

	const ValidationSchema = yup.object().shape({
		cardId: yup.string().required(requiredFieldMessage),
		isRefund: yup.boolean(),
		title: yup
			.string()
			.required(requiredFieldMessage)
			.max(60, maxLengthMessage('title', 60)),
		value: yup
			.string()
			.required(requiredFieldMessage)
			.typeError(requiredFieldMessage)
			.test({
				name: 'greaterThanZero',
				test: (value) => {
					if (currencyToNumber(value) <= 0) {
						return false;
					}
					return true;
				},
				message: valueGreaterThanMessage('zero')
			}),
		isInstallment: yup.boolean().typeError(invalidValueMessage),
		installments: yup
			.number()
			.min(1, valueGreaterThanMessage('one'))
			.typeError(invalidValueMessage)
			.integer(invalidValueMessage)
			.positive(invalidValueMessage)
			.when('isInstallment', {
				is: true,
				then: (schema) => schema.required(requiredFieldMessage)
			}),
		date: yup
			.date()
			.required(requiredFieldMessage)
			.typeError(invalidDateMessage),
		categoryId: yup.number()
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<CardTransactionFormFields>({
		resolver: yupResolver(ValidationSchema),
		mode: 'all',
		defaultValues: {
			cardId: selectedCard ?? data?.cardId ?? '-1',
			isRefund,
			title: data?.title ?? '',
			value: transactionValue,
			date: data?.date ?? format(new Date(), 'yyyy-MM-dd'),
			categoryId: data?.categoryId ?? -1,
			description: data?.description ?? '',
			chargedInstallments: data?.chargedInstallments ?? 1,
			installments,
			isInstallment,
			isRecurrent: data?.isRecurrent ?? false
		}
	});

	const onSubmit: SubmitHandler<CardTransactionFormFields> = (
		{
			cardId,
			title,
			value,
			isInstallment,
			installments,
			chargedInstallments,
			date,
			categoryId,
			description,
			isRefund
		},
		e
	): void => {
		e?.preventDefault();
		onFormSubmit({
			cardId,
			type: isRefund ? 'INCOME' : 'EXPENSE',
			title,
			value,
			isInstallment,
			installments,
			chargedInstallments,
			date: formatDateDB(new Date(date)),
			categoryId: categoryId === -1 ? undefined : categoryId,
			description
		});
	};

	useEffect(() => {
		if (isRefund) {
			setInstallments(1);
			setValue('installments', 1);
			setIsInstallment(false);
			setValue('isInstallment', false);
		}
	}, [isRefund, setValue]);

	return (
		<Flex
			as="form"
			gridRowGap="1.25rem"
			direction="column"
			w="100%"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<FormControl
				isInvalid={!!errors.cardId}
				isRequired
			>
				<FormLabel htmlFor="cardId">Card</FormLabel>
				<CardSelect {...register('cardId')} />
				{errors.cardId && (
					<FormErrorMessage>{errors.cardId.message}</FormErrorMessage>
				)}
			</FormControl>

			<Checkbox
				colorScheme="primaryApp"
				{...register('isRefund', {
					onChange(event: ChangeEvent<HTMLInputElement>) {
						const { checked } = event.target;
						setIsRefund(checked);
					}
				})}
			>
				It&apos;s refund
			</Checkbox>

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
					as={CurrencyInput}
					placeholder="Value"
					decimalsLimit={2}
					prefix="R$ "
					decimalSeparator=","
					groupSeparator="."
					defaultValue={transactionValue}
					{...register('value', {
						setValueAs(value: string) {
							const numberValue = currencyToNumber(String(value));
							setTransactionValue(numberValue);
							return numberValue;
						}
					})}
				/>
				{errors.value && (
					<FormErrorMessage>{errors.value.message}</FormErrorMessage>
				)}
			</FormControl>

			{!isRefund && (
				<Flex
					gap="1rem"
					justifyContent="space-between"
					alignItems="start"
				>
					<FormControl
						display="flex"
						gap="1rem"
					>
						<Checkbox
							flex={1}
							colorScheme="primaryApp"
							{...register('isInstallment', {
								onChange(e: ChangeEvent<HTMLInputElement>) {
									const { checked } = e.target;
									setIsInstallment(checked);
									setValue('installments', 1);
									setInstallments(1);
								}
							})}
						>
							Installments
						</Checkbox>
					</FormControl>
					{isInstallment && (
						<FormControl
							isInvalid={!!errors.installments}
							isDisabled={isRefund || !isInstallment}
						>
							<Flex
								direction="column"
								alignItems="end"
							>
								<InputGroup>
									<Input
										type="number"
										textAlign="end"
										min={1}
										{...register('installments', {
											onChange(e: ChangeEvent<HTMLInputElement>) {
												const { value } = e.target;
												setInstallments(Number(value));
											}
										})}
									/>
									<InputRightAddon
										height="auto"
										background={
											colorMode === 'light'
												? 'primaryApp.200'
												: 'primaryApp.100'
										}
										color={colorMode === 'light' ? 'white' : 'black'}
										borderRight={0}
									>
										<Text>x</Text>
									</InputRightAddon>
								</InputGroup>
								{isInstallment && (
									<FormHelperText>{installmentText}</FormHelperText>
								)}
								{errors.installments && (
									<FormErrorMessage>
										{errors.installments.message}
									</FormErrorMessage>
								)}
							</Flex>
						</FormControl>
					)}
				</Flex>
			)}

			<FormControl
				isInvalid={!!errors.date}
				isRequired
			>
				<FormLabel htmlFor="date">Date</FormLabel>
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

				<CategorySelect {...register('categoryId')} />
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
	);
}
