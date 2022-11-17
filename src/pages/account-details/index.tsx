import {
	Button,
	Flex,
	Heading,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Text
} from '@chakra-ui/react';
import { AccountTransactionList } from 'components/AccountTransactionList';
import { Loading } from 'components/Loading';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft, DotsThree, Pencil, Plus, SmileySad } from 'phosphor-react';
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
		setBankAccount(undefined);
		try {
			if (!id) {
				throw new Error('ID is required.');
			}
			const data = await getBankAccount({ id });
			setBankAccount(data);
		} catch (error) {
			setBankAccount(null);
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
					variant="fab"
					colorScheme="primaryApp"
					autoSelect={false}
					strategy="fixed"
				>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<DotsThree fontSize="2rem" />}
						position="fixed"
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
						zIndex="docked"
					/>
					<Portal>
						<MenuList>
							<MenuItem
								icon={<Plus />}
								iconSpacing={0}
								onClick={() => {
									navigate('/transaction/new', {
										state: { bankAccountId: bankAccount.id }
									});
								}}
							>
								New Transaction
							</MenuItem>
							<MenuItem
								icon={<Pencil />}
								iconSpacing={0}
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
					m="1rem"
					direction="column"
					gap="1rem"
					mb="3rem"
				>
					<AccountTransactionList transactions={bankAccount.transactions ?? []} />
				</Flex>
			</>
		);
	}

	if (bankAccount === undefined) {
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
