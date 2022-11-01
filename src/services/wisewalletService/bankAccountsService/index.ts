import axios from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';
import { httpClient } from 'utils/httpClient';
import type { ErrorResponse } from '..';
import { getAccessToken } from '../utils/getAccessToken';

export interface BankAccount {
	id: string;
	name: string;
	balance: number;
	holderId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BankAccountDTO {
	name: string;
	balance: number;
}

export interface UpdateBankAccountParams {
	id: string;
	bankAccount: Partial<BankAccount>;
}

export interface DeleteBankAccountParams {
	id: string;
}

async function getAllBankAccounts(): Promise<BankAccount[]> {
	try {
		const { data } = await httpClient.get<BankAccount[]>('/accounts/', {
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

async function updateBankAccount({
	id,
	bankAccount
}: UpdateBankAccountParams): Promise<BankAccount> {
	try {
		const { data } = await httpClient.put<BankAccount>(
			`/accounts/${id}`,
			bankAccount,
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
}

async function deleteBankAccount({
	id
}: DeleteBankAccountParams): Promise<BankAccount> {
	try {
		const { data } = await httpClient.delete<BankAccount>(`/accounts/${id}`, {
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

export const bankAccounts = {
	getAllBankAccounts,
	updateBankAccount,
	deleteBankAccount
};
