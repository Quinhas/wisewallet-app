import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import AccountCard from 'components/AccountCard';
import NewAccountCard from 'components/AccountCard/new';
import AccountCardSkeleton from 'components/AccountCard/skeleton';
import { useWisewallet } from 'hooks/useWisewallet';
import { SmileySad } from 'phosphor-react';

export function AccountsList(): JSX.Element {
	const { bankAccounts, getBankAccounts } = useWisewallet();

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
					getBankAccounts();
				}}
			>
				Try again!
			</Button>
		</Flex>
	);
}
