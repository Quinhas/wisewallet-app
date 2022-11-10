/* eslint-disable prettier/prettier */
import { Flex, Grid, Heading, Text, useStyleConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { AccountTransaction } from 'services/wisewalletService/bankAccountsService';

interface AccountTransactionItemProps
	extends AccountTransaction,
	Partial<StyleFunctionProps> {
}

export default function AccountTransactionItem({
	title,
	account,
	origin,
	destination,
	value,
	category,
	variant,
	type,
	...rest
}: AccountTransactionItemProps): JSX.Element {
	const variants = {
		variant: type.toLowerCase(),
		rest
	};

	const styles = useStyleConfig('StatementListItem', variants);

	return (
		<Grid __css={styles}>
			<Flex
				direction="column"
				overflow="hidden"
			>
				<Heading>{title ?? '-'}</Heading>
				{variant === 'expense' && (
					<Text
						fontFamily="mono"
						color="gray.500"
						fontSize="0.75rem"
						textTransform="uppercase"
					>
						{category ?? '-'}
					</Text>
				)}
			</Flex>
			<Flex
				direction="column"
				textAlign="end"
			>
				<Text className="value">
					{type === 'EXPENSE' ? '- ' : '+ '}
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(value)}
				</Text>
			</Flex>
		</Grid>
	);
}
