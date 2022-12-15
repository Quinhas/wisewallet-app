import {
	Button,
	Flex,
	IconButton,
	Select,
	SelectProps,
	Skeleton,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import CategoryFormModal from 'components/CategoryFormModal';
import { Plus } from 'phosphor-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';

export const CategorySelect = forwardRef<HTMLSelectElement, SelectProps>(
	({ ...rest }, ref) => {
		const [categories, setCategories] = useState<Category[] | null | undefined>(
			[]
		);

		const { isOpen, onOpen, onClose } = useDisclosure();

		const getCategories = useCallback(async () => {
			setCategories(undefined);
			try {
				const apiCategories = await wisewallet.categories.getAll();
				const formattedCategories: Category[] = apiCategories.map(
					(category) => ({
						...category,
						createdAt: formatDate(category.createdAt),
						updatedAt: formatDate(category.updatedAt)
					})
				);
				setCategories(formattedCategories);
			} catch (error) {
				setCategories(null);
			}
		}, []);

		useEffect(() => {
			getCategories();
		}, [getCategories]);

		if (categories === undefined) {
			return (
				<Flex
					justify="space-between"
					align="center"
					gap="0.5rem"
				>
					<Select
						as={Skeleton}
						disabled
					/>
					<IconButton
						aria-label="Create a new category"
						icon={<Plus />}
						disabled
						as={Skeleton}
					/>
				</Flex>
			);
		}
		if (categories === null) {
			return (
				<Flex
					justify="space-between"
					align="center"
				>
					<Text fontSize="1rem">We couldn&apos;t find your categories.</Text>
					<Button
						onClick={getCategories}
						size="sm"
						colorScheme="primaryApp"
					>
						Try again.
					</Button>
				</Flex>
			);
		}

		if (categories.length === 0) {
			return (
				<Flex
					justify="space-between"
					align="center"
				>
					<Text fontSize="1rem">No category found.</Text>
					<Button
						onClick={onOpen}
						size="sm"
						colorScheme="primaryApp"
					>
						Create
					</Button>
				</Flex>
			);
		}

		return (
			<>
				<Flex gap="0.5rem">
					<Select
						{...rest}
						ref={ref}
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
						onClick={onOpen}
						colorScheme="primaryApp"
						icon={<Plus />}
					/>
				</Flex>
				<CategoryFormModal
					isOpen={isOpen}
					onClose={() => {
						getCategories();
						onClose();
					}}
				/>
			</>
		);
	}
);
