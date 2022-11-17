/* eslint-disable prettier/prettier */
import { Flex, Grid, Heading, Text, useStyleConfig } from '@chakra-ui/react';
import { AccountTransaction } from 'services/wisewalletService/bankAccountsService';
import { formatCurrency } from 'utils/formatCurrency';

export default function AccountTransactionItem({
	title,
	value,
	type,
	description
}: AccountTransaction): JSX.Element {
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
				<Heading overflow="hidden"
					whiteSpace="nowrap"
					textOverflow="ellipsis">{title ?? '-'}</Heading>
				<Text
					fontFamily="heading"
					color="gray.500"
					fontSize="0.75rem"
					textTransform="uppercase"
					overflow="hidden"
					whiteSpace="nowrap"
					textOverflow="ellipsis"
				>
					{description}
				</Text>
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
