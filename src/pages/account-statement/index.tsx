import {
	Button,
	Flex,
	Heading,
	Icon,
	IconButton, Text
} from '@chakra-ui/react';
import { AccountStatement } from 'components/AccountStatement';
import { Loading } from 'components/Loading';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft, SmileySad } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountTransaction } from 'services/wisewalletService/bankAccountsService';

export function AccountStatementPage(): JSX.Element {
	const [transactions, setTransactions] = useState<
		AccountTransaction[] | undefined | null
	>();
	const { getAllAccountTransactions } = useWisewallet();
	const navigate = useNavigate();

	const getData = useCallback(async (): Promise<void> => {
		setTransactions(undefined);
		try {
			const data = await getAllAccountTransactions();
			setTransactions(data);
		} catch (error) {
			setTransactions(null);
		}
	}, [getAllAccountTransactions]);



	useEffect(() => {
		getData();
	}, [getData]);

	if (transactions) {
		return (
			<>
				<Flex
					alignItems="center"
					m="1rem"
					gap="0.5rem"
				>
					<IconButton
						aria-label="Return to home"
						icon={<ArrowLeft />}
						size="xs"
						minHeight="2rem"
						minW="2rem"
						colorScheme="primaryApp"
						variant="outline"
						onClick={() => navigate('/')}
					/>
					<Heading fontWeight={600}>Statement</Heading>
				</Flex>
				<Flex
					m="1rem"
					direction="column"
					gap="1rem"
					mb="3rem"
				>
					<AccountStatement transactions={transactions ?? []} showAccount />
				</Flex>
			</>
		);
	}

	if (transactions === undefined) {
		return <Loading />;
	}

	return (
		<Flex
			align="center"
			fontSize="1.5rem"
			m="1rem"
			p="1rem"
			direction="column"
			gap="1rem"
			textAlign="center"
			flex={1}
			justify="center"
		>
			<Icon
				as={SmileySad}
				color="primaryApp.200"
				fontSize="13rem"
			/>
			<Text
				fontSize="2xl"
				fontFamily="heading"
			>
				Oops! We couldn&apos;t find your bank account details!
			</Text>
			<Button
				colorScheme="primaryApp"
				onClick={() => {
					getData();
				}}
			>
				Try again!
			</Button>
		</Flex>
	);
}
