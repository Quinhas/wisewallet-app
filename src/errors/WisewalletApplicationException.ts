interface ErrorProps {
	message: string;
}

export default class WisewalletApplicationException extends Error {
	message: string;

	errors?: ErrorProps[];

	constructor(message: string, errors?: ErrorProps[]) {
		super();
		this.message = message;
		this.errors = errors;
	}
}
