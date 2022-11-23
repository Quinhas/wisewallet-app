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
	Category,
	CategoryDTO
} from 'services/wisewalletService/categoryService';
import {
	maxLengthMessage,
	requiredFieldMessage
} from 'utils/formValidationMessages';
import * as yup from 'yup';

interface CategoryFormProps {
	data?: Partial<Category>;
	onFormSubmit: (data: CategoryDTO) => void;
}

const ValidationSchema = yup.object().shape({
	description: yup
		.string()
		.required(requiredFieldMessage)
		.max(20, maxLengthMessage('description', 20))
});

export function CategoryForm({
	data,
	onFormSubmit
}: CategoryFormProps): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<CategoryDTO>({
		resolver: yupResolver(ValidationSchema),
		mode: 'onChange',
		defaultValues: {
			description: data?.description ?? ''
		}
	});

	const onSubmit: SubmitHandler<CategoryDTO> = (values, e): void => {
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
				isInvalid={!!errors.description}
				isRequired
			>
				<FormLabel htmlFor="description">Description</FormLabel>
				<Input
					placeholder="Description"
					type="text"
					{...register('description')}
					maxLength={20}
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
