/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
	useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { subYears } from 'date-fns';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { useAuth } from 'hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import {
	invalidAgeMessage,
	invalidDateMessage,
	invalidEmailMessage,
	passwordMinMessage,
	requiredFieldMessage,
	termsAndConditionsMessage
} from 'utils/formValidationMessages';
import { errorToast, successToast } from 'utils/toastConfig';
import * as yup from 'yup';

interface FormFields {
	name: string;
	email: string;
	password: string;
	birthdate: Date;
	termsAndConditions: boolean;
}

const schema = yup.object({
	name: yup.string().required(requiredFieldMessage),
	email: yup.string().email(invalidEmailMessage).required(requiredFieldMessage),
	password: yup
		.string()
		.min(6, passwordMinMessage)
		.required(requiredFieldMessage),
	birthdate: yup
		.date()
		.required(requiredFieldMessage)
		.max(subYears(new Date(), 15), invalidAgeMessage)
		.typeError(invalidDateMessage),
	termsAndConditions: yup
		.bool()
		.required(requiredFieldMessage)
		.isTrue(termsAndConditionsMessage)
});

export function SignUpPage(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting }
	} = useForm<FormFields>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			termsAndConditions: false
		}
	});
	const { signUp } = useAuth();
	const toast = useToast();

	const onSubmit: SubmitHandler<FormFields> = async (
		{ name, email, password, birthdate: strBirthdate },
		e
	): Promise<void> => {
		e?.preventDefault();
		try {
			const birthdate = new Date(strBirthdate);
			await signUp({
				name,
				email,
				password,
				birthdate
			});
			toast({
				...successToast,
				description: 'User registered successfully.'
			});
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				if (error.errors?.length !== 0) {
					error.errors?.forEach((err) => {
						toast({
							...errorToast,
							description: err.message
						});
					});
					return;
				}
			}

			toast({
				...errorToast,
				description: 'Could not continue. Try again.'
			});
		}
	};

	return (
		<>
			<Heading
				fontSize="2.5rem"
				color="primaryApp.300"
				fontWeight={700}
				mt="4rem"
				px="1rem"
			>
				Sign Up
			</Heading>
			<Flex
				as="form"
				action=""
				direction="column"
				gap="6rem"
				grow={1}
				justifyContent="center"
				px="1rem"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Flex
					direction="column"
					justifyContent="center"
					gap=".75rem"
				>
					<FormControl
						isInvalid={!!errors.name}
						isDisabled={isSubmitting}
					>
						<FormLabel fontSize="1.25rem">Name</FormLabel>
						<Input
							type="text"
							placeholder="e.g. Wise Wallet"
							{...register('name')}
						/>
						<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={!!errors.email}
						isDisabled={isSubmitting}
					>
						<FormLabel fontSize="1.25rem">E-mail</FormLabel>
						<Input
							type="email"
							placeholder="e.g. wise@wallet.com"
							{...register('email')}
						/>
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={!!errors.password}
						isDisabled={isSubmitting}
					>
						<FormLabel fontSize="1.25rem">Password</FormLabel>
						<Input
							type="password"
							placeholder="min 6 characters"
							{...register('password')}
						/>
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={!!errors.birthdate}
						isDisabled={isSubmitting}
					>
						<FormLabel fontSize="1.25rem">Birthdate</FormLabel>
						<Input
							type="date"
							{...register('birthdate')}
						/>
						<FormErrorMessage>{errors.birthdate?.message}</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={!!errors.termsAndConditions}
						isDisabled={isSubmitting}
					>
						<Checkbox
							{...register('termsAndConditions')}
							colorScheme="primaryApp"
						>
							<FormLabel
								fontSize="1rem"
								mb={0}
							>
								I agree to the{' '}
								<Link
									as={RouterLink}
									to="/terms-and-conditions"
									color="primaryApp.300"
									fontWeight={500}
								>
									terms and conditions.
								</Link>
							</FormLabel>
						</Checkbox>
						<FormErrorMessage>
							{errors.termsAndConditions?.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					direction="column"
					align="center"
					gap=".75rem"
				>
					<Button
						type="submit"
						colorScheme="primaryApp"
						width="full"
						disabled={isDirty ? !isValid : true}
						isLoading={isSubmitting}
					>
						Sign Up
					</Button>
					<Text>
						Already have an account?{' '}
						<Link
							as={RouterLink}
							to="/signup"
							color="primaryApp.300"
							fontWeight={500}
						>
							Sign Up
						</Link>
					</Text>
				</Flex>
			</Flex>
		</>
	);
}
