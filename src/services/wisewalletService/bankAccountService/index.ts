import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import { getAccessToken } from '../utils/getAccessToken';

export const bankAccountService: BankAccountService = {
	async getAll() {
		try {
			const { data } = await httpClient.get<APIBankAccount[]>('/accounts/', {
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
			const { data } = await httpClient.get<APIBankAccount>(`/accounts/${id}`, {
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

	async create({ data: bankAccount }) {
		try {
			const { data } = await httpClient.post<APIBankAccount>(
				`/accounts/`,
				bankAccount,
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

	async update({ id, data: bankAccount }) {
		try {
			const { data } = await httpClient.put<APIBankAccount>(
				`/accounts/${id}`,
				bankAccount,
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
			const { data } = await httpClient.delete<APIBankAccount>(
				`/accounts/${id}`,
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

	transactions: {
		async getAll() {
			try {
				const { data } = await httpClient.get<APIAccountTransaction[]>(
					`/account/transactions`,
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
				const { data } = await httpClient.get<APIAccountTransaction>(
					`/account/transactions/${id}`,
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
		async create({ data: accountTransaction }) {
			try {
				const { data } = await httpClient.post<APIAccountTransaction>(
					`/account/transactions`,
					accountTransaction,
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
		async update({ id, data: accountTransaction }) {
			try {
				const { data } = await httpClient.put<APIAccountTransaction>(
					`/account/transactions/${id}`,
					accountTransaction,
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
				const { data } = await httpClient.delete<APIAccountTransaction>(
					`/account/transactions/${id}`,
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
