import { Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { TransferForm } from 'components/TransferForm';
import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

interface FormFields {
	from: string;
	to: string;
	description: string;
	value: number;
	date: string;
}

export function NewTransferPage(): JSX.Element {
	const navigate = useNavigate();

	function onSubmit(data: FormFields): void {
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
					aria-label="Return to home"
					icon={<ArrowLeft />}
					size="xs"
					minHeight="2rem"
					minW="2rem"
					colorScheme="primaryApp"
					variant="outline"
					onClick={() => navigate('/')}
				/>
				<Heading fontWeight={600}>New Transfer</Heading>
			</Flex>
			<Flex
				justify="space-between"
				align="center"
				fontSize="1.5rem"
				mb="0.5rem"
				mx="1rem"
				p="1rem"
				bg={useColorModeValue('white', 'black')}
				borderRadius="2xl"
				boxShadow="md"
			>
				<TransferForm onFormSubmit={onSubmit} />
			</Flex>
		</>
	);
}
