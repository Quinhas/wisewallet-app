import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

interface UserProps {
	id: string;
	name: string;
	email: string;
	birthdate: string;
	createdAt: string;
	updatedAt: string;
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

	const signOut = useCallback(() => {
		localStorage.removeItem('wisewallet@accessToken');
		setUser(undefined);
		setIsLogged(false);
		navigate('/signin');
		setIsLoading(false);
	}, [navigate]);

	const validateToken = useCallback(
		(token: string): UserProps => {
			try {
				const decodedToken = jwtDecode<JwtPayload & UserProps>(token);
				if (!decodedToken.exp || decodedToken.exp <= Date.now() / 1000) {
					throw Error();
				}
				localStorage.setItem('wisewallet@accessToken', token);

				const birthdate = decodedToken.birthdate.split('T')[0];
				return {
					id: decodedToken.id,
					name: decodedToken.name,
					email: decodedToken.email,
					birthdate: format(parseISO(birthdate), 'P', { locale: ptBR }),
					createdAt: format(parseISO(decodedToken.createdAt), 'PPPp', {
						locale: ptBR
					}),
					updatedAt: format(parseISO(decodedToken.updatedAt), 'PPPp', {
						locale: ptBR
					})
				};
			} catch (error) {
				signOut();
				throw Error();
			}
		},
		[signOut]
	);

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

	const signIn = useCallback(
		async ({ email, password }: SignInParams) => {
			const res = await wisewallet.auth.signIn({
				email,
				password
			});
			const data = validateToken(res.access_token);
			setUser(data);
			setIsLogged(true);
		},
		[validateToken]
	);

	const signUp = useCallback(
		async ({ name, email, password, birthdate }: SignUpParams) => {
			const res = await wisewallet.auth.signUp({
				name,
				email,
				password,
				birthdate
			});
			const data = validateToken(res.access_token);
			setUser(data);
			setIsLogged(true);
		},
		[validateToken]
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
