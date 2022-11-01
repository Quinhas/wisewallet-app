import { Divider, Flex, Text } from '@chakra-ui/react';
import { AccountsList } from 'components/AccountsList';
import { useAuth } from 'hooks/useAuth';
import { useWisewallet } from 'hooks/useWisewallet';
import { Navigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';

export default function Home(): JSX.Element {
	const { user, signOut } = useAuth();
	const { balance } = useWisewallet();

	if (!user) {
		signOut();
		return <Navigate to="/signin" />;
	}

	return (
		<>
			<Flex
				py="1rem"
				as="header"
				direction="column"
			>
				<Flex
					px="1rem"
					justify="space-between"
					align="center"
				>
					<Text
						fontWeight={500}
						fontSize="1.5rem"
					>
						{getGreeting()}, {user.name.split(' ')[0]}!
					</Text>
				</Flex>
			</Flex>
			<Flex
				px="1rem"
				justify="space-between"
				align="center"
				fontSize="1.5rem"
			>
				<Text
					color="gray.500"
					fontWeight={300}
				>
					Balance:
				</Text>
				<Text
					color="primaryApp.300"
					fontWeight={600}
				>
					{balance.toLocaleString('pt-BR', {
						currency: 'BRL',
						style: 'currency'
					})}
				</Text>
			</Flex>
			<Divider
				maxW="calc(100vw - 3rem)"
				mx="auto"
				my="0.5rem"
			/>
			<AccountsList />
		</>
	);
}
