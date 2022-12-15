import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import AccountCard from 'components/AccountCard';
import NewAccountCard from 'components/AccountCard/new';
import AccountCardSkeleton from 'components/AccountCard/skeleton';
import { SmileySad } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { wisewallet } from 'services/wisewalletService';
import { formatDate } from 'utils/formatDate';

export function AccountsList(): JSX.Element {
	const [bankAccounts, setBankAccounts] = useState<
		BankAccount[] | undefined | null
	>();

	const getAllBankAccounts = useCallback(async () => {
		setBankAccounts(undefined);
		try {
			const data = await wisewallet.bankAccounts.getAll();
			const formattedData = data.map((acc) => ({
				...acc,
				createdAt: formatDate(acc.createdAt),
				updatedAt: formatDate(acc.updatedAt),
				transactions: []
			}));
			setBankAccounts(formattedData);
		} catch (error) {
			setBankAccounts(null);
		}
	}, []);

	useEffect(() => {
		getAllBankAccounts();
	}, [getAllBankAccounts]);

	if (bankAccounts && bankAccounts.length === 0) {
		return (
			<Flex
				direction="row"
				overflowX="auto"
				justify="space-between"
				shrink={1}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}}
			>
				<NewAccountCard />
			</Flex>
		);
	}

	if (bankAccounts) {
		return (
			<Flex
				direction="row"
				overflowX="auto"
				justify="space-between"
				shrink={1}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}}
				py="0.5rem"
			>
				{bankAccounts.map((account) => {
					return (
						<AccountCard
							key={account.id}
							id={account.id}
							type="Bank"
							value={account.balance}
							name={account.name}
						/>
					);
				})}
				<NewAccountCard />
			</Flex>
		);
	}

	if (bankAccounts === undefined) {
		return (
			<Flex
				direction="row"
				overflowX="auto"
				justify="space-between"
				shrink={1}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}}
			>
				<AccountCardSkeleton />
				<AccountCardSkeleton />
			</Flex>
		);
	}

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
					Oops! We couldn&apos;t find your bank accounts.
				</Text>
			</Flex>
			<Button
				colorScheme="primaryApp"
				onClick={() => {
					getAllBankAccounts();
				}}
			>
				Try again!
			</Button>
		</Flex>
	);
}
