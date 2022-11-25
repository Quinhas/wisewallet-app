declare interface APIAccountTransaction {
	id: string;
	holderId: string;
	title: string;
	description?: string;
	value: number;
	date: Date;
	type: 'INCOME' | 'EXPENSE';
	bankAccountId: string;
	categoryId?: number;
	createdAt: Date;
	updatedAt: Date;
	bankAccount: APIBankAccount;
}

interface AccountTransactionDTO {
	title: string;
	description?: string;
	value: number;
	date: Date;
	type: 'INCOME' | 'EXPENSE';
	bankAccountId: string;
	categoryId?: number;
	isRecurrent?: boolean;
}

declare interface AccountTransactionService {
	getAll: () => Promise<APIAccountTransaction[]>;
	getByID: (data: GetByIDParams) => Promise<APIAccountTransaction>;
	create: (
		data: CreateParams<AccountTransactionDTO>
	) => Promise<APIAccountTransaction>;
	update: (
		data: UpdateParams<string, APIAccountTransaction>
	) => Promise<APIAccountTransaction>;
	delete: (data: DeleteParams) => Promise<APIAccountTransaction>;
}
