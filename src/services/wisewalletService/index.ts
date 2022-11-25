import { authService } from './authService';
import { bankAccountService } from './bankAccountService';
import { categoryService } from './categoryService';

export const wisewallet = {
	auth: authService,
	bankAccounts: bankAccountService,
	categories: categoryService
};
