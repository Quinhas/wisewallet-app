import { Button, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { AccountsList } from 'components/AccountsList';
import { useAuth } from 'hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import getGreeting from 'utils/getGreeting';

export default function Home(): JSX.Element {
	const { user, signOut } = useAuth();
	const [balance, setBalance] = useState<string | null | undefined>();

	const getBalance = useCallback(async () => {
		setBalance(undefined);
		try {
			const bankAccounts = await wisewallet.bankAccounts.getAll();
			const sum = bankAccounts.reduce(
				(prevValue, currentValue) => prevValue + Number(currentValue.balance),
				0
			);
			setBalance(
				sum.toLocaleString('pt-BR', {
					currency: 'BRL',
					style: 'currency'
				})
			);
		} catch (error) {
			setBalance(null);
		}
	}, []);

	useEffect(() => {
		getBalance();
	}, [getBalance]);

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
				{balance === undefined && (
					<Spinner
						thickness="3px"
						speed="0.65s"
						emptyColor="gray.200"
						color="primaryApp.300"
						me="2rem"
					/>
				)}
				{balance === null && (
					<Button
						onClick={getBalance}
						size="xs"
						colorScheme="primaryApp"
					>
						Try again.
					</Button>
				)}
				{balance && (
					<Text
						color="primaryApp.300"
						fontWeight={600}
					>
						{balance}
					</Text>
				)}
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
