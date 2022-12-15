import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FloppyDisk } from 'phosphor-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	invalidValueMessage,
	maxLengthMessage,
	minLengthMessage,
	requiredFieldMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface AccountFormProps {
	data?: CreditCard;
	onFormSubmit: (data: CreditCardDTO) => void;
}

const ValidationSchema = yup.object().shape({
	name: yup
		.string()
		.max(25, maxLengthMessage('name', 25))
		.required(requiredFieldMessage),
	closingDay: yup
		.number()
		.required(requiredFieldMessage)
		.min(1, invalidValueMessage)
		.max(31, invalidValueMessage)
		.integer(invalidValueMessage)
		.typeError(invalidValueMessage),
	limit: yup.number().required(requiredFieldMessage),
	firstNumbers: yup
		.string()
		.max(4, maxLengthMessage('first numbers', 4))
		.min(4, minLengthMessage('first numbers', 4)),
	lastNumbers: yup
		.string()
		.max(4, maxLengthMessage('last numbers', 4))
		.min(4, minLengthMessage('last numbers', 4))
});

export function CardForm({
	data,
	onFormSubmit
}: AccountFormProps): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<CreditCardDTO>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange',
		defaultValues: {
			name: data?.name ?? '',
			closingDay: data?.closingDay ?? 1,
			firstNumbers: data?.firstNumbers ?? '',
			lastNumbers: data?.lastNumbers ?? '',
			limit: data?.limit ?? 0
		}
	});

	const onSubmit: SubmitHandler<CreditCardDTO> = (values, e): void => {
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
			<FormControl
				isInvalid={!!errors.name}
				isRequired
			>
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
				isInvalid={!!errors.limit}
				isRequired
			>
				<FormLabel htmlFor="limit">Limit</FormLabel>
				<Input
					placeholder="Limit"
					autoComplete="off"
					step={0.01}
					type="number"
					{...register('limit')}
				/>
				{errors.limit && (
					<FormErrorMessage>{errors.limit.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl
				isInvalid={!!errors.closingDay}
				isRequired
			>
				<FormLabel htmlFor="closingDay">Closing Day</FormLabel>
				<Input
					placeholder="Closing Day"
					autoComplete="off"
					step={1}
					type="number"
					{...register('closingDay')}
					max={31}
					min={1}
					maxLength={2}
					inputMode="numeric"
				/>
				{errors.closingDay && (
					<FormErrorMessage>{errors.closingDay.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl
				isInvalid={!!errors.firstNumbers}
				isRequired
			>
				<FormLabel htmlFor="firstNumbers">4 first numbers</FormLabel>
				<Input
					placeholder="4 first numbers"
					type="string"
					{...register('firstNumbers')}
					inputMode="numeric"
					maxLength={4}
				/>
				{errors.firstNumbers && (
					<FormErrorMessage>{errors.firstNumbers.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl
				isInvalid={!!errors.lastNumbers}
				isRequired
			>
				<FormLabel htmlFor="lastNumbers">4 last numbers</FormLabel>
				<Input
					placeholder="4 last numbers"
					type="string"
					{...register('lastNumbers')}
					inputMode="numeric"
					maxLength={4}
				/>
				{errors.lastNumbers && (
					<FormErrorMessage>{errors.lastNumbers.message}</FormErrorMessage>
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
