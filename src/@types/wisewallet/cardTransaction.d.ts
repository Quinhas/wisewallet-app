declare interface APICardTransaction {
	id: string;
	holderId: string;
	title: string;
	description?: string;
	value: number;
	date: string;
	type: 'INCOME' | 'EXPENSE';
	cardId: string;
	categoryId?: number;
	isRecurrent: boolean;
	isInstallment: boolean;
	installments: number;
	chargedInstallments: number;
	createdAt: string;
	updatedAt: string;
	card: APICreditCard;
}

interface APICardTransactionDTO {
	title: string;
	description?: string;
	value: number;
	date: Date;
	type: 'INCOME' | 'EXPENSE';
	cardId: string;
	categoryId?: number;
	isRecurrent: boolean;
	isInstallment: boolean;
	installments: number;
}

declare interface CardTransactionService {
	getAll: () => Promise<APICardTransaction[]>;
	getByID: (data: GetByIDParams) => Promise<APICardTransaction>;
	create: (
		data: CreateParams<APICardTransactionDTO>
	) => Promise<APICardTransaction>;
	update: (
		data: UpdateParams<string, APICardTransactionDTO>
	) => Promise<APICardTransaction>;
	delete: (data: DeleteParams) => Promise<APICardTransaction>;
}
