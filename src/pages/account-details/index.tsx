import {
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Text
} from '@chakra-ui/react';
import AccountTransactionItem from 'components/AccountTransactionItem';
import { Loading } from 'components/Loading';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft, DotsThree, Pencil, Plus } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BankAccount } from 'services/wisewalletService/bankAccountsService';

export function AccountDetailsPage(): JSX.Element {
	const [bankAccount, setBankAccount] = useState<
		BankAccount | undefined | null
	>();
	const { id } = useParams<{ id: string }>();
	const { getBankAccount } = useWisewallet();
	const navigate = useNavigate();

	const getData = useCallback(async (): Promise<void> => {
		try {
			if (!id) {
				throw new Error('ID is required.');
			}
			const data = await getBankAccount({ id });
			setBankAccount(data);
		} catch (error) {
			setBankAccount(null);
			console.log(error);
		}
	}, [getBankAccount, id]);

	useEffect(() => {
		getData();
	}, [getData]);

	if (bankAccount) {
		return (
			<>
				<Menu
					placement="top-end"
					isLazy
				>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<DotsThree fontSize="2rem" />}
						position="absolute"
						right="2rem"
						bottom="5rem"
						borderRadius="full"
						colorScheme="primaryApp"
						p="0"
						paddingInlineEnd={0}
						paddingInlineStart={0}
						width="3.5rem"
						height="3.5rem"
						minH="3.5rem"
						maxHeight="3.5rem"
					/>
					<Portal>
						<MenuList>
							<MenuItem
								icon={<Plus />}
								disabled
							>
								New Transaction
							</MenuItem>
							<MenuItem
								icon={<Pencil />}
								onClick={() =>
									navigate('edit', {
										relative: 'route',
										state: { bankAccount }
									})
								}
							>
								Edit Account
							</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
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
					<Heading fontWeight={600}>{bankAccount.name}</Heading>
				</Flex>
				<Flex
					justify="space-between"
					align="center"
					fontSize="1.5rem"
					mx="1rem"
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
						{Number(bankAccount.balance).toLocaleString('pt-BR', {
							currency: 'BRL',
							style: 'currency'
						})}
					</Text>
				</Flex>
				<Flex
					borderRadius="md"
					overflow="hidden"
					m="1rem"
					direction="column"
					gap="0.5rem"
				>
					{bankAccount.transactions?.map((transaction) => (
						<AccountTransactionItem
							key={transaction.id}
							{...transaction}
						/>
					))}
				</Flex>
			</>
		);
	}

	if (bankAccount === undefined) {
		return <Loading />;
	}

	return <Text>not found.</Text>;
}
