import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import { getAccessToken } from '../utils/getAccessToken';

export const categoryService: CategoryService = {
	async getAll() {
		try {
			const { data } = await httpClient.get<APICategory[]>('/categories/', {
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
			const { data } = await httpClient.get<APICategory>(`/categories/${id}`, {
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

	async create({ data: category }) {
		try {
			const { data } = await httpClient.post<APICategory>(
				`/categories/`,
				category,
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

	async update({ id, data: category }) {
		try {
			const { data } = await httpClient.put<APICategory>(
				`/categories/${id}`,
				category,
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
			const { data } = await httpClient.delete<APICategory>(
				`/categories/${id}`,
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
};
