import {
	Box,
	Flex,
	FlexProps,
	Icon,
	IconButton,
	LinkBox,
	LinkOverlay,
	Skeleton,
	Text,
	useStyleConfig
} from '@chakra-ui/react';
import { CreditCard, Pencil, PlusCircle } from 'phosphor-react';
import { Link, Link as RouterLink } from 'react-router-dom';

interface CardProps extends FlexProps {
	id?: string;
	name: string;
	limit: number;
	availableLimit: number;
	firstNumbers: string;
	lastNumbers: string;
	isClickable?: boolean;
	showEditButton?: boolean;
	variant?: 'itemList';
	colorScheme?: string;
	colorMode?: 'light' | 'dark';
	size?: 'md' | 'sm' | 'lg';
}

interface NewCardProps {
	colorScheme?: string;
	colorMode?: 'light' | 'dark';
	size?: 'md' | 'sm' | 'lg';
}

export function SkeletonCard({
	colorScheme,
	colorMode,
	size,
	...rest
}: NewCardProps): JSX.Element {
	const styles = useStyleConfig('Card', {
		variant: 'new',
		colorScheme,
		colorMode,
		size
	});

	return (
		<Flex
			as={Skeleton}
			__css={styles}
			{...rest}
		>
			<Text>LOADING</Text>
		</Flex>
	);
}

export function NewCard({
	colorScheme,
	colorMode,
	size,
	...rest
}: NewCardProps): JSX.Element {
	const styles = useStyleConfig('Card', {
		variant: 'new',
		colorScheme,
		colorMode,
		size
	});

	return (
		<Flex
			__css={styles}
			as={LinkBox}
			{...rest}
		>
			<LinkOverlay
				as={RouterLink}
				to="/cards/new"
				id="content"
			>
				<Icon as={PlusCircle} />
				<Text>New Card</Text>
			</LinkOverlay>
		</Flex>
	);
}

export function Card({
	id,
	name = 'CARD NAME',
	limit = 0,
	availableLimit = 0,
	firstNumbers = '****',
	lastNumbers = '****',
	variant,
	colorScheme,
	colorMode,
	size,
	isClickable = false,
	showEditButton = false,
	...rest
}: CardProps): JSX.Element {
	const styles = useStyleConfig('Card', {
		variant,
		colorScheme,
		colorMode,
		size
	});

	return (
		<Box
			__css={styles}
			as={isClickable ? LinkBox : Box}
			{...rest}
		>
			<Flex id="content">
				<Flex as="header">
					<Box>
						<Icon as={CreditCard} />
					</Box>
					{isClickable && (
						<LinkOverlay
							as={RouterLink}
							to={`/cards/${id ?? ''}`}
							id="name"
						>
							{name}
						</LinkOverlay>
					)}
					{!isClickable && <Text id="name">{name}</Text>}
				</Flex>
				<Flex id="number">
					<Text>{firstNumbers}</Text>
					<Text>****</Text>
					<Text>****</Text>
					<Text>{lastNumbers}</Text>
				</Flex>
				<Flex as="footer">
					<Text id="available">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						}).format(Number(availableLimit))}
					</Text>
					<Text id="limit">
						/
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						}).format(Number(limit))}
					</Text>
				</Flex>
				{showEditButton && (
					<IconButton
						id="btnEdit"
						size="sm"
						colorScheme="blackAlpha"
						aria-label="Edit Card"
						icon={<Pencil />}
						as={Link}
						to="edit"
					/>
				)}
			</Flex>
		</Box>
	);
}
