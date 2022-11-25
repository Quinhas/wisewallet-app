import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';

export const authService: AuthService = {
	async signIn({ email, password }) {
		try {
			const { data } = await httpClient.post<AuthResponse>('/auth/signin', {
				email,
				password
			});
			return data;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const { data } = error.response as { data: APIError };
				throw new WisewalletApplicationException(data.error.message);
			}

			throw new WisewalletApplicationException(
				'Could not continue. Contact an administrator.'
			);
		}
	},

	async signUp({ name, email, password, birthdate }) {
		try {
			const { data } = await httpClient.post<AuthResponse>('/auth/signup', {
				name,
				email,
				password,
				birthdate
			});
			return data;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const { data } = error.response as { data: APIError };
				throw new WisewalletApplicationException(data.error.message);
			}

			throw new WisewalletApplicationException(
				'Could not continue. Contact an administrator.'
			);
		}
	}
};
