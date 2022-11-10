import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import { Loading } from 'components/Loading';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	BankAccount,
	BankAccountDTO
} from 'services/wisewalletService/bankAccountsService';

export function EditAccountPage(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const { updateBankAccount } = useWisewallet();
	const { bankAccount } = location.state as { bankAccount: BankAccount };

	function onSubmit(data: BankAccountDTO): void {
		updateBankAccount({
			id: bankAccount.id,
			bankAccount: data
		});
		navigate(-1);
	}

	if (bankAccount) {
		return (
			<>
				<Flex
					alignItems="center"
					m="1rem"
					gap="0.5rem"
				>
					<IconButton
						aria-label="Return to account"
						icon={<ArrowLeft />}
						size="xs"
						minHeight="2rem"
						minW="2rem"
						colorScheme="primaryApp"
						variant="outline"
						onClick={() => navigate(-1)}
					/>
					<Heading fontWeight={600}>Edit {bankAccount.name}</Heading>
				</Flex>
				<Flex
					justify="space-between"
					align="center"
					fontSize="1.5rem"
					mx="1rem"
					p="1rem"
					bg="white"
					borderRadius="2xl"
					boxShadow="md"
				>
					<AccountForm
						data={bankAccount}
						onFormSubmit={onSubmit}
					/>
				</Flex>
			</>
		);
	}

	if (bankAccount === undefined) {
		return <Loading />;
	}

	return <Text>not found.</Text>;
}
