import { Flex } from '@chakra-ui/react';
import AccountCard from 'components/AccountCard';
import { useWisewallet } from 'hooks/useWisewallet';

export function AccountsList(): JSX.Element {
	const { bankAccounts } = useWisewallet();

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
		</Flex>
	);
}
