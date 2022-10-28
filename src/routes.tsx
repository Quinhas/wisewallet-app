import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import App from 'pages/App';
import { SignInPage } from 'pages/signin';
import { SignUpPage } from 'pages/signup';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
	const { isLoading, isLogged } = useAuth();

	if (isLoading) {
		return (
			<Flex
				w="100vw"
				h="100vh"
				align="center"
				justify="center"
			>
				<Flex
					direction="column"
					align="center"
					gridGap="1.5rem"
					bg="white"
					boxShadow="md"
					py="2rem"
					px="4rem"
					borderRadius="md"
				>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="primaryApp.300"
						size="xl"
					/>
					<Text color="gray.500">Loading...</Text>
				</Flex>
			</Flex>
		);
	}

	if (!isLogged) {
		return <Navigate to="/signin" />;
	}

	return children;
}

export function CustomRoutes(): JSX.Element {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<App />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/signin"
				element={<SignInPage />}
			/>
			<Route
				path="/signup"
				element={<SignUpPage />}
			/>
		</Routes>
	);
}
