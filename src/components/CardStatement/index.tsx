import {
	Accordion,
	Button,
	Divider,
	Flex,
	Select,
	Text
} from '@chakra-ui/react';
import { getMonth, getYear } from 'date-fns';
import { Plus } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { CardStatementItem } from './Item';

interface AccountStatementProps {
	transactions: CardTransaction[];
	cardId: string;
	showCardName?: boolean;
	showNewTransactionButton?: boolean;
}

const colorScheme = {
	EXPENSE: 'danger',
	INCOME: 'success'
};

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

interface GroupedTransaction {
	date: string;
	transactions: CardTransaction[];
}

export function CardStatement({
	transactions,
	cardId,
	showCardName,
	showNewTransactionButton = true
}: AccountStatementProps): JSX.Element {
	const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
	const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
	const navigate = useNavigate();

	const groupedTransactions: GroupedTransaction[] = useMemo((): Array<{
		date: string;
		transactions: CardTransaction[];
	}> => {
		if (!transactions) {
			return [];
		}

		const filteredTransactions = transactions.filter(
			(transaction) =>
				getYear(new Date(transaction.date)) === selectedYear &&
				getMonth(new Date(transaction.date)) === selectedMonth
		);

		filteredTransactions.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

		const uniqueDates = [
			...new Set(
				filteredTransactions.map((transaction) => formatDate(transaction.date))
			)
		];

		return uniqueDates.map((date) => {
			const filteredTransactions = transactions
				.filter((transaction) => formatDate(transaction.date) === date)
				.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);
			return {
				date,
				transactions: filteredTransactions
			};
		});
	}, [transactions, selectedMonth, selectedYear]);

	const years = useMemo(() => {
		const years = transactions.map((transaction) => {
			return getYear(new Date(transaction.date));
		});
		years.push(getYear(new Date()));
		return [...new Set(years)];
	}, [transactions]);

	return (
		<Flex
			direction="column"
			gap="1rem"
		>
			<Flex>
				{showNewTransactionButton && (
					<Button
						size="sm"
						leftIcon={<Plus />}
						colorScheme="primaryApp"
						variant="outline"
						onClick={() => {
							navigate('../new-transaction', {
								relative: 'path',
								state: { selectedCard: cardId }
							});
						}}
					>
						Transaction
					</Button>
				)}
				<Flex
					ms="auto"
					gap="0.5rem"
				>
					<Select
						w="auto"
						size="sm"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(Number(e.target.value))}
					>
						{months.map((month, i) => (
							<option
								key={month}
								value={i}
							>
								{month}
							</option>
						))}
					</Select>
					<Select
						w="auto"
						size="sm"
						value={
							years.includes(selectedYear)
								? selectedYear
								: years[years.length - 1]
						}
						onChange={(e) => setSelectedYear(Number(e.target.value))}
					>
						{years.map((year) => (
							<option
								key={year}
								value={year}
							>
								{year}
							</option>
						))}
					</Select>
				</Flex>
			</Flex>
			{groupedTransactions.length === 0 && (
				<Flex
					justify="center"
					direction="column"
					gap="0.5rem"
				>
					<Text
						fontFamily="heading"
						fontSize="0.875rem"
						color="gray.500"
						fontWeight={300}
					>
						There are no records in {months[selectedMonth]} {selectedYear} .
					</Text>
					<Divider />
				</Flex>
			)}
			{groupedTransactions.length > 0 &&
				groupedTransactions.map((date) => (
					<Flex
						key={date.date}
						direction="column"
						gap="0.25rem"
					>
						<Text
							fontFamily="heading"
							fontSize="0.875rem"
							color="gray.500"
						>
							{date.date}
						</Text>
						<Accordion
							display="flex"
							flexDirection="column"
							gap="0.5rem"
							allowToggle
						>
							{date.transactions.map((transaction) => (
								<CardStatementItem
									key={transaction.id}
									colorScheme={colorScheme[transaction.type]}
									transaction={transaction}
									showCardName={showCardName}
								/>
							))}
						</Accordion>
						<Divider mt="0.5rem" />
					</Flex>
				))}
		</Flex>
	);
}
