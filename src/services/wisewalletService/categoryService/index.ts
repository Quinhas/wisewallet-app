import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import type { ErrorResponse } from '..';
import { getAccessToken } from '../utils/getAccessToken';

export interface CategoryDTO {
	description: string;
}

export interface Category {
	id: number;
	user: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface GetBankAccountByIDParams {
	id: number;
}

export interface CreateCategoryParams {
	category: CategoryDTO;
}

export interface UpdateCategoryParams {
	id: string;
	category: Partial<Category>;
}

export interface DeleteBankAccountParams {
	id: number;
}

export const categories = {
	async getAllCategories(): Promise<Category[]> {
		try {
			const { data } = await httpClient.get<Category[]>('/categories/', {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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
	},

	async getCategoryByID({ id }: GetBankAccountByIDParams): Promise<Category> {
		try {
			const { data } = await httpClient.get<Category>(`/categories/${id}`, {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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
	},

	async createCategory({ category }: CreateCategoryParams): Promise<Category> {
		try {
			const { data } = await httpClient.post<Category>(
				`/categories/`,
				category,
				{
					headers: { Authorization: `Bearer ${getAccessToken()}` }
				}
			);
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
	},

	async updateCategory({
		id,
		category
	}: UpdateCategoryParams): Promise<Category> {
		try {
			const { data } = await httpClient.put<Category>(
				`/categories/${id}`,
				category,
				{
					headers: { Authorization: `Bearer ${getAccessToken()}` }
				}
			);
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
	},

	async deleteCategory({ id }: DeleteBankAccountParams): Promise<Category> {
		try {
			const { data } = await httpClient.delete<Category>(`/categories/${id}`, {
				headers: { Authorization: `Bearer ${getAccessToken()}` }
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
};
