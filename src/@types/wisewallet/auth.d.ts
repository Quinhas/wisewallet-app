declare interface SignInParams {
	email: string;
	password: string;
}

interface AuthResponse {
	access_token: string;
}

declare interface SignUpParams {
	name: string;
	email: string;
	password: string;
	birthdate: Date;
}

declare interface AuthService {
	signIn: (data: SignInParams) => Promise<AuthResponse>;
	signUp: (data: SignUpParams) => Promise<AuthResponse>;
}
