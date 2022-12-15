import { authService } from './authService';
import { bankAccountService } from './bankAccountService';
import { categoryService } from './categoryService';
import { creditCardService } from './creditCardService';

export const wisewallet = {
	auth: authService,
	bankAccounts: bankAccountService,
	categories: categoryService,
	cards: creditCardService
};
