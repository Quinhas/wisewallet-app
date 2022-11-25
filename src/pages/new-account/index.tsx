import {
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { AccountForm } from 'components/AccountForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

export function NewAccountPage(): JSX.Element {
	const navigate = useNavigate();
	const toast = useToast();

	async function onSubmit(data: BankAccountDTO): Promise<void> {
		try {
			const bankAccount = await wisewallet.bankAccounts.create({
				data
			});
			navigate(`/account/${bankAccount.id}`);
		} catch (error) {
			if (error instanceof WisewalletApplicationException) {
				toast({
					...errorToast,
					description: error.message
				});
				return;
			}

			toast({
				...errorToast,
				description: 'Could not update bank account. Try again.'
			});
		}
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
