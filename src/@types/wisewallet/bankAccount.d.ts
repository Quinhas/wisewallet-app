declare interface APIBankAccount {
	id: string;
	name: string;
	balance: number;
	holderId: string;
	createdAt: string;
	updatedAt: string;
	transactions?: APIAccountTransaction[];
}

interface APIBankAccountDTO {
	name: string;
	balance: number;
}

declare interface BankAccountService {
	getAll: () => Promise<APIBankAccount[]>;
	getByID: (data: GetByIDParams) => Promise<APIBankAccount>;
	create: (data: CreateParams<APIBankAccountDTO>) => Promise<APIBankAccount>;
	update: (
		data: UpdateParams<string, APIBankAccount>
	) => Promise<APIBankAccount>;
	delete: (data: DeleteParams) => Promise<APIBankAccount>;
	transactions: AccountTransactionService;
}
