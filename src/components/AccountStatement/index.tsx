import { Divider, Flex, Text } from "@chakra-ui/react";
import AccountTransactionCard from "components/AccountTransactionCard";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback } from "react";
import { AccountTransaction } from "services/wisewalletService/bankAccountsService";

interface AccountStatementProps {
	transactions: AccountTransaction[];
	showAccount?: boolean;
}

export function AccountStatement({ transactions, showAccount }: AccountStatementProps): JSX.Element {

	const groupedTransactions = useCallback((): Array<{ date: string; transactions: AccountTransaction[] }> => {
		if (!transactions) {
			return [];
		}

		transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const uniqueDates = [...new Set(transactions.map((transaction) => format(parseISO(String(transaction.date)), 'P', { locale: ptBR })))];

		return uniqueDates.map((date) => {
			const filteredTransactions = transactions.filter((transaction) => format(parseISO(String(transaction.date)), 'P', { locale: ptBR }) === date);
			return {
				date,
				transactions: filteredTransactions
			}
		});
	}, [transactions])

	if (transactions.length === 0) {
		return (
			<Flex justify="center" direction='column' gap='0.5rem'>
				<Text fontFamily="heading" fontSize="0.875rem" color="gray.500" fontWeight={300}>
					There are no records.
				</Text>
				<Divider />
			</Flex>
		)
	}

	return (
		<Flex direction="column" gap="1rem">
			{
				groupedTransactions().map((date) => (
					<Flex key={date.date} direction="column" gap="0.25rem">
						<Text fontFamily="heading" fontSize="0.875rem" color="gray.500">{date.date}</Text>
						<Flex direction="column" gap="0.25rem">
							{
								date.transactions.map((transaction) => (
									<AccountTransactionCard
										key={transaction.id}
										title={transaction.title}
										subtitle={showAccount ? transaction.bankAccount.name : transaction.description}
										type={transaction.type}
										value={transaction.value}
									/>
								))
							}
						</Flex>
						<Divider mt="0.5rem" />
					</Flex>
				))
			}
		</Flex>
	)
}
