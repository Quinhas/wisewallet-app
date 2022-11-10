/* eslint-disable @typescript-eslint/no-misused-promises */
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
	BankAccount,
	BankAccountDTO
} from 'services/wisewalletService/bankAccountsService';
import {
	maxLengthMessage,
	requiredFieldMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface AccountFormProps {
	data?: BankAccount;
	onFormSubmit: (data: BankAccountDTO) => void;
}

const ValidationSchema = yup.object().shape({
	name: yup
		.string()
		.max(25, maxLengthMessage('name', 25))
		.required(requiredFieldMessage),
	balance: yup.number().required(requiredFieldMessage)
});

export function AccountForm({
	data,
	onFormSubmit
}: AccountFormProps): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<BankAccountDTO>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange',
		defaultValues: {
			name: data?.name ?? '',
			balance: data?.balance ?? 0
		}
	});

	const onSubmit: SubmitHandler<BankAccountDTO> = (values, e): void => {
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
