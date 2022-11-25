declare interface BankAccount {
	id: string;
	name: string;
	balance: number;
	holderId: string;
	createdAt: string;
	updatedAt: string;
	transactions?: AccountTransaction[];
}

declare interface BankAccountDTO {
	name: string;
	balance: number;
}
