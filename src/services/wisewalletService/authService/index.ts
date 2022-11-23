import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import type { ErrorResponse } from '..';

export interface SignInParams {
	email: string;
	password: string;
}

interface LoginResponse {
	access_token: string;
}

export interface SignUpParams {
	name: string;
	email: string;
	password: string;
	birthdate: Date;
}

async function signIn({
	email,
	password
}: SignInParams): Promise<LoginResponse> {
	try {
		const { data } = await httpClient.post<LoginResponse>('/auth/signin', {
			email,
			password
		});
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const { data } = error.response as { data: ErrorResponse };
			throw new WisewalletApplicationException(data.message, data.errors);
		}

		throw new WisewalletApplicationException(
			'Could not continue. Contact an administrator.'
		);
	}
}

async function signUp({
	name,
	email,
	password,
	birthdate
}: SignUpParams): Promise<LoginResponse> {
	try {
		const { data } = await httpClient.post<LoginResponse>('/auth/signup', {
			name,
			email,
			password,
			birthdate
		});
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const { data } = error.response as { data: ErrorResponse };
			throw new WisewalletApplicationException(data.message, data.errors);
		}

		throw new WisewalletApplicationException(
			'Could not continue. Contact an administrator.'
		);
	}
}

export const authService = {
	signIn,
	signUp
};
