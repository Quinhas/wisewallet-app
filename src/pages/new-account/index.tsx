import { Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import { useWisewallet } from 'hooks/useWisewallet';
import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { BankAccountDTO } from 'services/wisewalletService/bankAccountsService';

export function NewAccountPage(): JSX.Element {
	const navigate = useNavigate();
	const { createBankAccount } = useWisewallet();

	function onSubmit(data: BankAccountDTO): void {
		createBankAccount({
			bankAccount: data
		});
		navigate('/', { relative: 'path' });
	}

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
					onClick={() => navigate('/', { relative: 'path' })}
				/>
				<Heading fontWeight={600}>New Bank Account</Heading>
			</Flex>
			<Flex
				justify="space-between"
				align="center"
				fontSize="1.5rem"
				mx="1rem"
				p="1rem"
				bg={useColorModeValue('white', 'black')}
				borderRadius="2xl"
				boxShadow="md"
			>
				<AccountForm onFormSubmit={onSubmit} />
			</Flex>
		</>
	);
}
