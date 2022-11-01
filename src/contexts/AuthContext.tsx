import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import type { ReactNode } from 'react';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { wisewallet } from 'services/wisewalletService';
import type {
	SignInParams,
	SignUpParams
} from 'services/wisewalletService/authService';

interface UserProps {
	id: string;
	name: string;
}

export interface AuthContextProps {
	user: UserProps | undefined;
	isLogged: boolean;
	signIn: (props: SignInParams) => Promise<void>;
	signUp: (props: SignUpParams) => Promise<void>;
	signOut: () => void;
	isLoading: boolean;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
	children
}: AuthContextProviderProps): JSX.Element {
	const [user, setUser] = useState<UserProps | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	function validateToken(token: string): UserProps {
		const decodedToken = jwtDecode<JwtPayload & UserProps>(token);
		if (!decodedToken.exp || decodedToken.exp <= Date.now() / 1000) {
			throw Error();
		}

		return {
			id: decodedToken.id,
			name: decodedToken.name
		};
	}

	const signOut = useCallback(() => {
		setUser(undefined);
		setIsLogged(false);
		localStorage.removeItem('wisewallet@accessToken');
		navigate('/signin');
		setIsLoading(false);
	}, [navigate]);

	useEffect(() => {
		try {
			const localToken = localStorage.getItem('wisewallet@accessToken');
			if (!localToken) {
				throw new Error();
			}
			const data = validateToken(localToken);
			setUser(data);
			setIsLogged(true);
		} catch (error) {
			signOut();
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (!isLoading && isLogged) {
			if (['/signin', '/signup'].includes(location.pathname)) {
				navigate('/');
			}

			const interceptor = axios.interceptors.response.use(
				(res) => res,
				(err) => {
					if (axios.isAxiosError(err)) {
						if (err.response?.status === 401) {
							signOut();
							return {};
						}
					}

					return err as Error;
				}
			);

			return () => {
				axios.interceptors.response.eject(interceptor);
			};
		}
	}, [signOut, isLoading, isLogged, location.pathname, navigate]);

	const signIn = useCallback(async ({ email, password }: SignInParams) => {
		const res = await wisewallet.signIn({
			email,
			password
		});
		const data = validateToken(res.access_token);
		setUser(data);
		localStorage.setItem('wisewallet@accessToken', res.access_token);
		setIsLogged(true);
	}, []);

	const signUp = useCallback(
		async ({ name, email, password, birthdate }: SignUpParams) => {
			const res = await wisewallet.signUp({
				name,
				email,
				password,
				birthdate
			});
			const data = validateToken(res.access_token);
			setUser(data);
			localStorage.setItem('wisewallet@accessToken', res.access_token);
			setIsLogged(true);
		},
		[]
	);

	const value = useMemo(
		() => ({
			user,
			isLogged,
			signIn,
			signUp,
			signOut,
			isLoading
		}),
		[user, isLogged, signIn, signOut, signUp, isLoading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
