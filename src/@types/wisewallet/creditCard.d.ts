declare interface APICreditCard {
	id: string;
	holderId: string;
	name: string;
	limit: number;
	availableLimit: number;
	closingDay: number;
	firstNumbers: string;
	lastNumbers: string;
	createdAt: string;
	updatedAt: string;
	transactions?: APICardTransaction[];
}

interface APICreditCardDTO {
	name: string;
	limit: number;
	closingDay: number;
	firstNumbers: string;
	lastNumbers: string;
}

declare interface CreditCardService {
	getAll: () => Promise<APICreditCard[]>;
	getByID: (data: GetByIDParams) => Promise<APICreditCard>;
	create: (data: CreateParams<APICreditCardDTO>) => Promise<APICreditCard>;
	update: (data: UpdateParams<string, APICreditCard>) => Promise<APICreditCard>;
	delete: (data: DeleteParams) => Promise<APICreditCard>;
	transactions: CardTransactionService;
}
