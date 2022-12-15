declare interface CreditCard {
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
	transactions?: CardTransaction[];
}

declare interface CreditCardDTO {
	name: string;
	limit: number;
	closingDay: number;
	firstNumbers: string;
	lastNumbers: string;
}
