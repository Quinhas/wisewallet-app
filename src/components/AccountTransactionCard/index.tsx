/* eslint-disable prettier/prettier */
import { Flex, Grid, Heading, Text, useStyleConfig } from '@chakra-ui/react';
import { formatCurrency } from 'utils/formatCurrency';

interface AccountTransactionCardProps {
	title: string;
	subtitle?: string;
	value: number;
	type: 'INCOME' | 'EXPENSE';
}

export default function AccountTransactionCard({
	title,
	subtitle,
	value,
	type,
}: AccountTransactionCardProps): JSX.Element {
	const variants = {
		variant: type.toLowerCase()
	};

	const styles = useStyleConfig('StatementListItem', variants);

	return (
		<Grid __css={styles}>
			<Flex
				direction="column"
				overflow="hidden"
			>
				<Heading
					overflow="hidden"
					whiteSpace="nowrap"
					textOverflow="ellipsis"
				>
					{title ?? '-'}
				</Heading>
				{subtitle && (<Text
					fontFamily="heading"
					color="gray.500"
					fontSize="0.75rem"
					textTransform="uppercase"
					overflow="hidden"
					whiteSpace="nowrap"
					textOverflow="ellipsis"
				>
					{subtitle}
				</Text>)}
			</Flex>
			<Flex
				direction="column"
				textAlign="end"
			>
				<Text className="value">
					{type === 'EXPENSE' ? '- ' : '+ '}
					{formatCurrency(value)}
				</Text>
			</Flex>
		</Grid>
	);
}
