import {
	Button,
	Flex,
	Heading,
	Icon,
	IconButton,
	Text
} from '@chakra-ui/react';
import { Card } from 'components/Card';
import { CardStatement } from 'components/CardStatement';
import { Loading } from 'components/Loading';
import { ArrowLeft, SmileySad } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';

export function CardPage(): JSX.Element {
	const [card, setCard] = useState<CreditCard | undefined | null>();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const getData = useCallback(async (): Promise<void> => {
		setCard(undefined);
		try {
			if (!id) {
				throw new Error('ID is required.');
			}
			const data = await wisewallet.cards.getByID({ id });
			setCard(data);
		} catch (error) {
			setCard(null);
		}
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData]);

	if (card === undefined) {
		return <Loading />;
	}

	if (card === null) {
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
					Oops! We couldn&apos;t find your card details!
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
				<Heading fontWeight={600}>Card Details</Heading>
			</Flex>
			<Flex
				m="1rem"
				direction={['column', 'row']}
				gap="1rem"
			>
				<Card
					colorScheme="primaryApp"
					h="auto"
					name={card.name}
					firstNumbers={card.firstNumbers}
					lastNumbers={card.lastNumbers}
					limit={card.limit}
					availableLimit={card.availableLimit}
					showEditButton
				/>
				<CardStatement
					transactions={card.transactions ?? []}
					cardId={card.id}
				/>
			</Flex>
		</>
	);
}
