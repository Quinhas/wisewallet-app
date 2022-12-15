declare interface CardTransaction {
	id: string;
	holderId: string;
	title: string;
	description?: string;
	value: number;
	date: string;
	type: 'INCOME' | 'EXPENSE';
	categoryId?: number;
	isRecurrent: boolean;
	cardId: string;
	isInstallment: boolean;
	installments: number;
	chargedInstallments: number;
	createdAt: string;
	updatedAt: string;
	card?: APICreditCard;
	category?: APICategory;
}
declare interface CardTransactionDTO {
	title: string;
	description?: string;
	value: number;
	date: Date;
	type: 'INCOME' | 'EXPENSE';
	cardId: string;
	categoryId?: number;
	isRecurrent?: boolean;
	isInstallment?: boolean;
	installments: number;
	chargedInstallments: number;
}
