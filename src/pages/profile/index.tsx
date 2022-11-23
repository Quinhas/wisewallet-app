import {
	Avatar,
	Button,
	Flex,
	Heading,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { SignOut } from 'phosphor-react';
import { Navigate } from 'react-router-dom';

interface InfoProps {
	title: string;
	value: string;
}

function Info({ title, value }: InfoProps): JSX.Element {
	return (
		<Flex
			direction="column"
			px="1rem"
		>
			<Heading
				color="primaryApp.300"
				fontWeight="semibold"
				fontSize="1.25rem"
			>
				{title}
			</Heading>
			<Text
				fontSize="1.25rem"
				color={useColorModeValue('gray.800', 'gray.100')}
			>
				{value}
			</Text>
		</Flex>
	);
}

export function ProfilePage(): JSX.Element {
	const { user, signOut } = useAuth();

	if (!user) {
		signOut();
		return <Navigate to="/signin" />;
	}

	return (
		<Flex
			direction="column"
			py="1rem"
			gridGap="1rem"
			minHeight="calc(100vh - 8rem)"
		>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gridGap="0.5rem"
				mb="0.5rem"
			>
				<Avatar
					boxShadow="lg"
					bg="primaryApp.300"
					w="9rem"
					h="9rem"
					src=""
				/>
				<Heading
					fontSize="1.875rem"
					fontWeight="semibold"
				>
					Hello, {user.name.split(' ')[0]}!
				</Heading>
			</Flex>
			<Info
				title="Name"
				value={user.name}
			/>
			<Info
				title="E-mail"
				value={user.email}
			/>
			<Info
				title="Birthdate"
				value={user.birthdate}
			/>
			<Flex
				direction="column"
				textAlign="end"
			>
				<Text
					mx="1rem"
					fontSize="0.75rem"
					textColor="gray.400"
				>
					last updated at: {user.updatedAt}
				</Text>
				<Text
					mx="1rem"
					fontSize="0.75rem"
					textColor="gray.400"
				>
					created at: {user.createdAt}
				</Text>
			</Flex>
			<Button
				mt="auto"
				mx="1rem"
				colorScheme="primaryApp"
				variant="outline"
				rightIcon={<SignOut />}
				onClick={signOut}
			>
				Sign Out
			</Button>
		</Flex>
	);
}
