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
import AccountFormModal from 'components/AccountFormModal';
import { Plus } from 'phosphor-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';

export const CardSelect = forwardRef<HTMLSelectElement, SelectProps>(
	({ ...rest }, ref) => {
		const [cards, setCards] = useState<CreditCard[] | null | undefined>();
		const { isOpen, onOpen, onClose } = useDisclosure();

		const getCards = useCallback(async () => {
			setCards(undefined);
			try {
				const apiCards = await wisewallet.cards.getAll();
				const formattedCards: CreditCard[] = apiCards.map((card) => ({
					...card,
					createdAt: formatDate(card.createdAt),
					updatedAt: formatDate(card.updatedAt),
					transactions: []
				}));
				setCards(formattedCards);
			} catch (error) {
				setCards(null);
			}
		}, []);

		useEffect(() => {
			getCards();
		}, [getCards]);

		if (cards === undefined) {
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
						aria-label="Create a new card"
						icon={<Plus />}
						disabled
						as={Skeleton}
					/>
				</Flex>
			);
		}

		if (cards === null) {
			return (
				<Flex
					justify="space-between"
					align="center"
				>
					<Text fontSize="1rem">We couldn&apos;t find your cards.</Text>
					<Button
						onClick={getCards}
						size="sm"
						colorScheme="primaryApp"
					>
						Try again.
					</Button>
				</Flex>
			);
		}

		if (cards.length === 0) {
			return (
				<Flex
					justify="space-between"
					align="center"
				>
					<Text fontSize="1rem">No card found.</Text>
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
						ref={ref}
						{...rest}
					>
						<option
							value={-1}
							hidden
							disabled
						>
							Select
						</option>
						{cards.map((card) => (
							<option
								key={card.id}
								value={card.id}
							>
								{card.name}
							</option>
						))}
					</Select>
					<IconButton
						aria-label="Create a new account"
						onClick={onOpen}
						colorScheme="primaryApp"
						icon={<Plus />}
					/>
				</Flex>
				<AccountFormModal
					isOpen={isOpen}
					onClose={() => {
						getCards();
						onClose();
					}}
				/>
			</>
		);
	}
);
