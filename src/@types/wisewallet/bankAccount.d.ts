declare interface APIBankAccount {
	id: string;
	name: string;
	balance: number;
	holderId: string;
	createdAt: Date;
	updatedAt: Date;
	transactions?: APIAccountTransaction[];
}

interface BankAccountDTO {
	name: string;
	balance: number;
}

declare interface BankAccountService {
	getAll: () => Promise<APIBankAccount[]>;
	getByID: (data: GetByIDParams) => Promise<APIBankAccount>;
	create: (data: CreateParams<BankAccountDTO>) => Promise<APIBankAccount>;
	update: (
		data: UpdateParams<string, APIBankAccount>
	) => Promise<APIBankAccount>;
	delete: (data: DeleteParams) => Promise<APIBankAccount>;
	transactions: AccountTransactionService;
}
