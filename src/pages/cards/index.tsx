import {
	Button,
	Flex,
	Heading,
	Icon,
	IconButton,
	Text
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { Loading } from 'components/Loading';
import { ArrowLeft, SmileySad } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';

export function CardsPage(): JSX.Element {
	const [cards, setCards] = useState<CreditCard[] | undefined | null>();
	const navigate = useNavigate();

	const getData = useCallback(async (): Promise<void> => {
		setCards(undefined);
		try {
			const data = await wisewallet.cards.getAll();
			const cards: CreditCard[] = data.map((card) => {
				return {
					...card,
					createdAt: formatDate(card.createdAt),
					updatedAt: formatDate(card.updatedAt),
					transactions: []
				};
			});
			setCards(cards);
		} catch (error) {
			setCards(null);
		}
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	if (cards === undefined) {
		return <Loading />;
	}

	if (cards === null) {
		return (
			<Flex
				align="center"
				fontSize="1.5rem"
				m="1rem"
				p="1rem"
				direction="column"
				gap="1rem"
				textAlign="center"
				flex={1}
				justify="center"
			>
				<Icon
					as={SmileySad}
					color="primaryApp.200"
					fontSize="13rem"
				/>
				<Text
					fontSize="2xl"
					fontFamily="heading"
				>
					Oops! We couldn&apos;t find your cards!
				</Text>
				<Button
					colorScheme="primaryApp"
					onClick={() => {
						getData();
					}}
				>
					Try again!
				</Button>
			</Flex>
		);
	}

	return (
		<>
			<Flex
				alignItems="center"
				m="1rem"
				gap="0.5rem"
			>
				<IconButton
					aria-label="Return to home"
					icon={<ArrowLeft />}
					size="xs"
					minHeight="2rem"
					minW="2rem"
					colorScheme="primaryApp"
					variant="outline"
					onClick={() => navigate('/')}
				/>
				<Heading fontWeight={600}>Cards</Heading>
			</Flex>
			<Flex
				m="1rem"
				direction={['column', 'row']}
				gap="1rem"
			>
				{cards.map((card) => (
					<Card
						colorScheme="primaryApp"
						h="auto"
						name={card.name}
						firstNumbers={card.firstNumbers}
						lastNumbers={card.lastNumbers}
						limit={card.limit}
						availableLimit={card.availableLimit}
						isClickable
						id={card.id}
					/>
				))}
			</Flex>
		</>
	);
}
