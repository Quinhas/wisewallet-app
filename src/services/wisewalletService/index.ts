import { authService } from './authService';
import { bankAccounts } from './bankAccountsService';
import { categories } from './categoryService';

interface ErrorProps {
	message: string;
}

export interface ErrorResponse {
	message: string;
	errors?: ErrorProps[];
}
export const wisewallet = {
	...authService,
	...bankAccounts,
	...categories
};
