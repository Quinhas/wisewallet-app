import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import { getAccessToken } from '../utils/getAccessToken';

export const creditCardService: CreditCardService = {
	async getAll() {
		try {
			const { data } = await httpClient.get<APICreditCard[]>('/cards/', {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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

	async getByID({ id }) {
		try {
			const { data } = await httpClient.get<APICreditCard>(`/cards/${id}`, {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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

	async create({ data: creditCard }) {
		try {
			const { data } = await httpClient.post<APICreditCard>(
				`/cards/`,
				creditCard,
				{
					headers: { Authorization: `Bearer ${getAccessToken()}` }
				}
			);
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

	async update({ id, data: creditCard }) {
		try {
			const { data } = await httpClient.put<APICreditCard>(
				`/cards/${id}`,
				creditCard,
				{
					headers: { Authorization: `Bearer ${getAccessToken()}` }
				}
			);
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

	async delete({ id }) {
		try {
			const { data } = await httpClient.delete<APICreditCard>(`/cards/${id}`, {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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

	transactions: {
		async getAll() {
			try {
				const { data } = await httpClient.get<APICardTransaction[]>(
					`/card/transactions`,
					{
						headers: { Authorization: `Bearer ${getAccessToken()}` }
					}
				);
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
		async getByID({ id }) {
			try {
				const { data } = await httpClient.get<APICardTransaction>(
					`/card/transactions/${id}`,
					{
						headers: { Authorization: `Bearer ${getAccessToken()}` }
					}
				);
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
		async create({ data: cardTransaction }) {
			try {
				const { data } = await httpClient.post<APICardTransaction>(
					`/card/transactions`,
					cardTransaction,
					{
						headers: { Authorization: `Bearer ${getAccessToken()}` }
					}
				);
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
		async update({ id, data: cardTransaction }) {
			try {
				const { data } = await httpClient.put<APICardTransaction>(
					`/card/transactions/${id}`,
					cardTransaction,
					{
						headers: { Authorization: `Bearer ${getAccessToken()}` }
					}
				);
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
		async delete({ id }) {
			try {
				const { data } = await httpClient.delete<APICardTransaction>(
					`/card/transactions/${id}`,
					{
						headers: { Authorization: `Bearer ${getAccessToken()}` }
					}
				);
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
	}
};
