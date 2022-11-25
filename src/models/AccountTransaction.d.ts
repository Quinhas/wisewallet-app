declare interface AccountTransaction {
	id: string;
	holderId: string;
	title: string;
	description?: string;
	value: number;
	date: string;
	type: 'INCOME' | 'EXPENSE';
	bankAccountId: string;
	categoryId?: number;
	createdAt: string;
	updatedAt: string;
	bankAccount: APIBankAccount;
}

declare interface AccountTransactionDTO {
	title: string;
	description?: string;
	value: number;
	date: Date;
	type: 'INCOME' | 'EXPENSE';
	bankAccountId: string;
	categoryId?: number;
	isRecurrent?: boolean;
}
