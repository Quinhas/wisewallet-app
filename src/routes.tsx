import { Loading } from 'components/Loading';
import Navbar from 'components/Navbar';
import Tabs from 'components/Tabs';
import { WisewalletContextProvider } from 'contexts/WisewalletContext';
import { useAuth } from 'hooks/useAuth';
import { AccountDetailsPage } from 'pages/account-details';
import App from 'pages/App';
import { EditAccountPage } from 'pages/edit-account';
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
		<WisewalletContextProvider>
			<>
				<Navbar />
				{children}
				<Tabs />
			</>
		</WisewalletContextProvider>
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
		</Routes>
	);
}
