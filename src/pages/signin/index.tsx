import {
	Button,
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
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { useAuth } from 'hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import {
	invalidEmailMessage,
	minLengthMessage,
	requiredFieldMessage
} from 'utils/formValidationMessages';
import { errorToast, successToast } from 'utils/toastConfig';
import * as yup from 'yup';

interface FormFields {
	email: string;
	password: string;
}

const schema = yup.object({
	email: yup.string().email(invalidEmailMessage).required(requiredFieldMessage),
	password: yup
		.string()
		.min(6, minLengthMessage('password', 6))
		.required(requiredFieldMessage)
});

export function SignInPage(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty, isSubmitting }
	} = useForm<FormFields>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});
	const { signIn } = useAuth();
	const toast = useToast();

	const onSubmit: SubmitHandler<FormFields> = async (
		{ email, password },
		e
	): Promise<void> => {
		e?.preventDefault();
		try {
			await signIn({ email, password });
			toast({
				...successToast,
				description: 'User logged in successfully.'
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
				Sign In
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
					<Link
						as={RouterLink}
						to="/forgot-password"
						color="primaryApp.300"
						alignSelf="end"
					>
						Forgot password?
					</Link>
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
						Sign In
					</Button>
					<Text>
						Don&apos;t have an account yet?{' '}
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
