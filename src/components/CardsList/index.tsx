import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { Card, NewCard, SkeletonCard } from 'components/Card';
import { SmileySad } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';

interface CardsListProps {
	colorMode?: 'light' | 'dark';
	size?: 'sm' | 'md' | 'lg';
}

export function CardsList({
	size = 'sm',
	colorMode
}: CardsListProps): JSX.Element {
	const [cards, setCards] = useState<CreditCard[] | undefined | null>(
		undefined
	);

	const getAllCards = useCallback(async () => {
		setCards(undefined);
		try {
			const data = await wisewallet.cards.getAll();
			const formattedData = data.map((acc) => ({
				...acc,
				createdAt: formatDate(acc.createdAt),
				updatedAt: formatDate(acc.updatedAt),
				transactions: []
			}));
			setCards(formattedData);
		} catch (error) {
			setCards(null);
		}
	}, []);

	useEffect(() => {
		getAllCards();
	}, [getAllCards]);

	if (cards === undefined) {
		return (
			<Flex
				direction="row"
				overflowX="auto"
				shrink={1}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}}
				gap="1rem"
				py="0.5rem"
			>
				<SkeletonCard
					size={size}
					colorMode={colorMode}
				/>
				<SkeletonCard
					size={size}
					colorMode={colorMode}
				/>
				<SkeletonCard
					size={size}
					colorMode={colorMode}
				/>
				<SkeletonCard
					size={size}
					colorMode={colorMode}
				/>
			</Flex>
		);
	}

	if (cards === null) {
		return (
			<Flex
				m="1rem"
				p="1rem"
				direction="column"
				gap="1rem"
			>
				<Flex gap="1rem">
					<Icon
						as={SmileySad}
						color="primaryApp.200"
						fontSize="3rem"
					/>
					<Text fontFamily="heading">
						Oops! We couldn&apos;t find your cards.
					</Text>
				</Flex>
				<Button
					colorScheme="primaryApp"
					onClick={() => {
						getAllCards();
					}}
				>
					Try again!
				</Button>
			</Flex>
		);
	}

	return (
		<Flex
			direction="row"
			overflowX="auto"
			shrink={1}
			css={{
				'&::-webkit-scrollbar': {
					display: 'none'
				}
			}}
			gap="1rem"
			py="0.5rem"
		>
			{cards.map((card) => {
				return (
					<Card
						key={card.id}
						id={card.id}
						name={card.name}
						availableLimit={card.availableLimit}
						limit={card.limit}
						firstNumbers={card.firstNumbers}
						lastNumbers={card.lastNumbers}
						variant="itemList"
						size={size}
						colorMode={colorMode}
						isClickable
					/>
				);
			})}
			<NewCard
				size={size}
				colorMode={colorMode}
			/>
		</Flex>
	);
}
