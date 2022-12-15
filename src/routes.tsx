import { Box } from '@chakra-ui/react';
import { Loading } from 'components/Loading';
import Navbar from 'components/Navbar';
import Tabs from 'components/Tabs';
import { useAuth } from 'hooks/useAuth';
import { AccountDetailsPage } from 'pages/account-details';
import { AccountStatementPage } from 'pages/account-statement';
import App from 'pages/App';
import { CardsPage } from 'pages/cards';
import { CardPage } from 'pages/cards/:id';
import { CardTransactionPage } from 'pages/cards/:id/:transactionId';
import { EditCardPage } from 'pages/cards/:id/edit';
import { NewCardPage } from 'pages/cards/new';
import { NewCardTransactionPage } from 'pages/cards/new-transaction';
import { EditAccountPage } from 'pages/edit-account';
import { NewAccountPage } from 'pages/new-account';
import { NewAccountTransactionPage } from 'pages/new-account-transaction';
import { ProfilePage } from 'pages/profile';
import { SignInPage } from 'pages/signin';
import { SignUpPage } from 'pages/signup';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
	const { isLoading, isLogged, user, signOut } = useAuth();

	if (isLoading) {
		return <Loading />;
	}

	if (!isLogged || !user) {
		signOut();
		return <Navigate to="/signin" />;
	}

	return (
		<>
			<Navbar />
			<Box
				as="main"
				maxH="calc(100vh - 4rem - 4rem)"
				h="calc(100vh - 4rem - 4rem)"
				overflowY="scroll"
			>
				{children}
			</Box>
			<Tabs />
		</>
	);
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
				path="signin"
				element={<SignInPage />}
			/>
			<Route
				path="signup"
				element={<SignUpPage />}
			/>
			<Route
				path="profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/account/:id"
				element={
					<ProtectedRoute>
						<AccountDetailsPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/account/:id/edit"
				element={
					<ProtectedRoute>
						<EditAccountPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/transaction/new"
				element={
					<ProtectedRoute>
						<NewAccountTransactionPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/account/new"
				element={
					<ProtectedRoute>
						<NewAccountPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/account-statement/"
				element={
					<ProtectedRoute>
						<AccountStatementPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards"
				element={
					<ProtectedRoute>
						<CardsPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards/new"
				element={
					<ProtectedRoute>
						<NewCardPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards/:id"
				element={
					<ProtectedRoute>
						<CardPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards/:id/edit"
				element={
					<ProtectedRoute>
						<EditCardPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards/new-transaction"
				element={
					<ProtectedRoute>
						<NewCardTransactionPage />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/cards/:id/:transactionId"
				element={
					<ProtectedRoute>
						<CardTransactionPage />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
