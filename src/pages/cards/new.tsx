import {
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { CardForm } from 'components/CardForm';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import { errorToast } from 'utils/toastConfig';

export function NewCardPage(): JSX.Element {
	const navigate = useNavigate();
	const toast = useToast();

	async function onSubmit(data: CreditCardDTO): Promise<void> {
		try {
			const bankAccount = await wisewallet.cards.create({
				data
			});
			navigate(`/card/${bankAccount.id}`);
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
				description: 'Could not create card. Try again.'
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
					aria-label="Return"
					icon={<ArrowLeft />}
					size="xs"
					minHeight="2rem"
					minW="2rem"
					colorScheme="primaryApp"
					variant="outline"
					onClick={() => navigate('/', { relative: 'path' })}
				/>
				<Heading fontWeight={600}>New Card</Heading>
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
				<CardForm onFormSubmit={onSubmit} />
			</Flex>
		</>
	);
}
