import { authService } from './authService';
import { bankAccounts } from './bankAccountsService';

interface ErrorProps {
	message: string;
}

export interface ErrorResponse {
	message: string;
	errors?: ErrorProps[];
}
export const wisewallet = {
	...authService,
	...bankAccounts
};
