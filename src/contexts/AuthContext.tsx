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
	id: string | undefined;
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
	const [id, setId] = useState<string | undefined>(undefined);
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

	const handleLogout = useCallback(() => {
		setUser(undefined);
		setIsLoading(false);
		setIsLogged(false);
		localStorage.removeItem('token');
		navigate('/entrar');
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
			setIsLogged(false);
			localStorage.removeItem('token');
		} finally {
			setIsLoading(false);
		}
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
							handleLogout();
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
	}, [handleLogout, isLoading, isLogged, location.pathname, navigate]);

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

	const signOut = useCallback(() => {
		setIsLoading(true);
		setIsLogged(false);
		localStorage.removeItem('wisewallet@accessToken');
		setUser(undefined);
		setId(undefined);
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
			id,
			user,
			isLogged,
			signIn,
			signUp,
			signOut,
			isLoading
		}),
		[id, user, isLogged, signIn, signOut, signUp, isLoading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
